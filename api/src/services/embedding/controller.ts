import { FastifyReply, FastifyRequest } from "fastify";
import { EmbeddingItemType } from "./interface";

export class EmbeddingController {
  public static add = async (
    request: FastifyRequest<{
      Body: EmbeddingItemType;
    }>,
    reply: FastifyReply
  ): Promise<void> => {
    const newEmbedding = await request.embeddingManager.add(request.body);
    reply.send({
      collection: {
        version: "1.0",
        data: newEmbedding,
      },
    });
  };

  public static list = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const embeddingList = await request.embeddingManager.list();
    reply.send({
      collection: {
        version: "1.0",
        data: embeddingList,
      },
    });
  };
}
