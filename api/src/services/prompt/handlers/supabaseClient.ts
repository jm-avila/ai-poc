import { createClient } from "@supabase/supabase-js";

interface Client {
  url?: string;
  key?: string;
}

const client: Client = {
  url: process.env.SUPABASE_DB_URL,
  key: process.env.SUPABASE_PROJECT_API_KEY,
};

if (!client.url || !client.key) {
  throw new Error("Missing Supabase credentials");
}

export const supabaseClient = createClient(client.url!, client.key!);
