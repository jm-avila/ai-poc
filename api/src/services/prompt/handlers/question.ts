import GPT3Tokenizer from "gpt3-tokenizer";
import fetch from "node-fetch";
import { OpenAIStream, OpenAIStreamPayload } from "./OpenAIStream";
import { supabaseClient } from "./supabaseClient";

export async function question(question: string) {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = question.replace(/\n/g, " ");

  const apiKey = process.env.OPENAI_KEY;

  const embeddingResponse = await fetch(
    "https://api.openai.com/v1/embeddings",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input,
        model: "text-embedding-ada-002",
      }),
    }
  );

  const embeddingData: any = await embeddingResponse.json();
  const [{ embedding }] = embeddingData.data;

  const { data: documents, error } = await supabaseClient.rpc(
    "match_documents",
    {
      query_embedding: embedding,
      similarity_threshold: 0.1, // Choose an appropriate threshold for your data
      match_count: 10, // Choose the number of matches
    }
  );

  if (error) console.error(error);

  const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
  let tokenCount = 0;
  let contextText = "";

  // Concat matched documents
  if (documents) {
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      const content = document.content;
      const url = document.url;
      const encoded = tokenizer.encode(content);
      tokenCount += encoded.text.length;

      // Limit context to max 1500 tokens (configurable)
      if (tokenCount > 1500) {
        break;
      }

      contextText += `${content.trim()}\nSOURCE: ${url}\n---\n`;
    }
  }

  const systemContent = `You are a helpful assistant. When given CONTEXT you answer questions using only that information,
  and you always format your output in markdown. You include code snippets if relevant. If you are unsure and the answer
  is not explicitly written in the CONTEXT provided, you say
  "Sorry, I don't know how to help with that."  If the CONTEXT includes 
  source URLs include them under a SOURCES heading at the end of your response. Always include all of the relevant source urls 
  from the CONTEXT, but never list a URL more than once (ignore trailing forward slashes when comparing for uniqueness). Never include URLs that are not in the CONTEXT sections. Never make up URLs`;

  const userMessage = `CONTEXT:
  ${contextText}
  
  USER QUESTION: 
  ${question}  
  `;

  const messages = [
    {
      role: "system",
      content: systemContent,
    },
    {
      role: "user",
      content: userMessage,
    },
  ];

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo-0301",
    messages: messages,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return stream;
}
