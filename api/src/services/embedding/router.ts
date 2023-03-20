import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Embedding } from "./entity";
import { EmbeddingManager } from "./manager";
import { EmbeddingController } from "./controller";
import { EmbeddingItem, EmbeddingItemType } from "./interface";

export async function EmbeddingRouter(fastify: FastifyInstance): Promise<void> {
  fastify.decorateRequest("embeddingManager", null);
  fastify.addHook(
    "preHandler",
    function (request: FastifyRequest, reply: FastifyReply, done) {
      const embeddingRepository = request.em.getRepository(Embedding);
      request.embeddingManager = new EmbeddingManager(
        embeddingRepository,
        fastify.log
      );
      done();
    }
  );

  fastify.post<{ Body: EmbeddingItemType; Response: EmbeddingItemType }>(
    "/embedding",
    {
      schema: {
        body: EmbeddingItem,
      },
    },
    EmbeddingController.add
  );
  fastify.get("/embedding", EmbeddingController.list);
}

declare module "fastify" {
  export interface FastifyRequest {
    embeddingManager: EmbeddingManager;
  }
}
