import { FastifyInstance } from "fastify";
import FastifyEnv from "@fastify/env";
import DotEnv from "dotenv";
import fp from "fastify-plugin";

DotEnv.config();

const schema = {
  type: "object",
  required: ["port", "log", "supabase", "openAi"],
  properties: {
    port: {
      type: "number",
      default: 8080,
    },
    log: {
      type: "object",
      properties: {
        level: {
          type: "string",
          default: "debug",
        },
        driver: {
          type: "string",
          default: "local",
        },
      },
    },
    supabase: {
      type: "object",
      properties: {
        key: {
          type: "string",
        },
        url: {
          type: "string",
        },
      },
    },
    openAi: {
      type: "object",
      properties: {
        key: {
          type: "string",
        },
      },
    },
  },
};

const options = {
  confKey: "config",
  schema: schema,
  data: {
    port: process.env.PORT && Number(process.env.PORT),
    log: {
      level: process.env.LOG_LEVEL,
      driver: process.env.LOG_DRIVER,
    },
    supabase: {
      key: process.env.SUPABASE_PROJECT_API_KEY,
      url: process.env.SUPABASE_DB_URL,
    },
    openAi: {
      key: process.env.OPENAI_KEY,
    },
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
  }
  interface FastifyRequest {
    config: Config;
  }
}

export interface Config {
  port: number;
  log: {
    level: string;
    driver: string;
  };
  supabase: {
    key: string;
    url: string;
  };
  openAi: {
    key: string;
  };
}

export async function initConfig(fastify: FastifyInstance): Promise<void> {
  fastify.register(FastifyEnv, options);

  fastify.decorateRequest("config", null);
  fastify.addHook("onRequest", async (req) => {
    req.config = options.data as Config;
  });
}

export const ConfigPlugin = fp(initConfig, { name: "fastify-config" });
