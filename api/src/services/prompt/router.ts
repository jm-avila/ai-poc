import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PromptController } from "./controller";
import {
  InsertData,
  InsertDataType,
  Question,
  QuestionType,
} from "./interface";

export async function PromptRouter(fastify: FastifyInstance): Promise<void> {
  fastify.post<{
    Body: InsertDataType;
  }>(
    "/prompt/insert",
    {
      schema: {
        body: InsertData,
      },
    },
    PromptController.insert
  );
  fastify.post<{
    Body: QuestionType;
  }>(
    "/prompt/question",
    {
      schema: {
        body: Question,
      },
    },
    PromptController.question
  );
}
