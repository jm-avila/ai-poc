import { EntityName, EventArgs } from "@mikro-orm/core";
import { FastifyInstance } from "fastify";
import { Saga } from "../../util/saga";
import { Embedding } from "../embedding";

export class EmbeddingSaga extends Saga {
  public constructor(fastify: FastifyInstance) {
    super(fastify.orm.em);
  }

  public getSubscribedEntities(): EntityName<Embedding>[] {
    return [Embedding];
  }

  public async afterCreate(args: EventArgs<Embedding>) {
    console.log("EmbeddingSaga", args.entity);
  }
}
