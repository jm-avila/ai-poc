import fetch from "node-fetch";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export interface OpenAIStreamPayload {
  model: string;
  messages: { role: string; content: string }[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body: string[] = [];

  function onParse(event: ParsedEvent | ReconnectInterval) {
    if (event.type === "event") {
      const data = event.data;
      if (data === "[DONE]") {
        return;
      }
      try {
        const json = JSON.parse(data);
        const content: string = json.choices[0].delta.content;
        if (typeof content === "string") {
          body.push(content);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  const parser = createParser(onParse);

  for await (const chunk of res.body as any) {
    parser.feed(decoder.decode(chunk));
  }

  return body.join("");
}
