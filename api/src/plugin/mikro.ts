import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { MikroORM, EntityManager } from "@mikro-orm/core";
import type { MongoDriver } from "@mikro-orm/mongodb";

const fastifyMikro = async (fastify: FastifyInstance) => {
  let orm: any;
  try {
    orm = await MikroORM.init<MongoDriver>({
      entities: ["*/services/**/entity.*"],
      type: "mongo",
      debug: true,
      clientUrl: process.env.MONGO_CLIENT_URL,
      tsNode: true,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }

  fastify.decorate("orm", orm);
  fastify.addHook("onRequest", async (request) => {
    request.em = orm.em.fork();
  });
  fastify.addHook("onClose", (fastify) => fastify.orm.close(true));
};

declare module "fastify" {
  export interface FastifyInstance {
    orm: MikroORM;
  }

  export interface FastifyRequest {
    em: EntityManager;
  }
}

export const MirkoPlugin = fp(fastifyMikro, { name: "fastify-mikro" });
