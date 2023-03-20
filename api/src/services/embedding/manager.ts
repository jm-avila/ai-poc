import { EntityRepository } from "@mikro-orm/core";
import { FastifyBaseLogger } from "fastify";
import { Embedding, EmbeddingData } from "./entity";

export class EmbeddingManager {
  public constructor(
    private embeddingRepository: EntityRepository<Embedding>,
    private logger: FastifyBaseLogger
  ) {}

  public add = async (
    embeddingData: EmbeddingData
  ): Promise<Embedding | void> => {
    try {
      const embedding = new Embedding(embeddingData);
      await this.embeddingRepository.persistAndFlush(embedding);
      return embedding;
    } catch (error) {
      this.logger.error(`Unable to create embedding: ${error}`);
    }
  };

  public list = async (): Promise<Embedding[] | void> => {
    try {
      return await this.embeddingRepository.findAll();
    } catch (error) {
      this.logger.error(`Unable to list embeddings: ${error}`);
    }
  };
}
