import { FastifyReply, FastifyRequest } from "fastify";
import { insert } from "./handlers/insert";
import { question } from "./handlers/question";
import { InsertDataType, QuestionType } from "./interface";

export class PromptController {
  public static insert = async (
    request: FastifyRequest<{
      Body: InsertDataType;
    }>,
    reply: FastifyReply
  ): Promise<void> => {
    const url: string[] = [];
    if ("url" in request.body) {
      url.push(request.body.url);
    } else {
      url.push(...request.body.urls);
    }
    await insert(url);
    reply.send("insert success");
  };

  public static question = async (
    request: FastifyRequest<{
      Body: QuestionType;
    }>,
    reply: FastifyReply
  ): Promise<void> => {
    const response = await question(request.body.question);
    reply.send(response);
  };
}
