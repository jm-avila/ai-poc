import { Configuration, OpenAIApi } from "openai";
import fetch from "node-fetch";
import { supabaseClient } from "./supabaseClient";
import * as cheerio from "cheerio";

// embedding doc sizes
const docSize: number = 1000;

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openAi = new OpenAIApi(configuration);

async function getDocuments(urls: string[]) {
  const documents = [];
  for (const url of urls) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    // tag based e.g. <main>
    const articleText = $("body").text();
    // class bsaed e.g. <div class="docs-content">
    // const articleText = $(".docs-content").text();

    let start = 0;
    while (start < articleText.length) {
      const end = start + docSize;
      const chunk = articleText.slice(start, end);
      documents.push({ url, body: chunk });
      start = end;
    }
  }
  return documents;
}

export async function insert(urls: string[]) {
  const documents = await getDocuments(urls);

  for (const { url, body } of documents) {
    const input = body.replace(/\n/g, " ");

    console.log("\nDocument length: \n", body.length);
    console.log("\nURL: \n", url);

    const embeddingResponse = await openAi.createEmbedding({
      model: "text-embedding-ada-002",
      input,
    });

    const [{ embedding }] = embeddingResponse.data.data;

    // In production we should handle possible errors
    await supabaseClient.from("documents").insert({
      content: input,
      embedding,
      url,
    });
  }
}
