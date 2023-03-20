import Fastify, { FastifyInstance } from "fastify";
import { CustomLogger, LoggerPlugin } from "./plugin/logger";
import { ConfigPlugin } from "./plugin/config";
import { MirkoPlugin } from "./plugin/mikro";
import {
  StatusRouter,
  EmbeddingRouter,
  EmbeddingSaga,
  PromptRouter,
} from "./services";

async function server() {
  const fastify: FastifyInstance = Fastify({
    logger: CustomLogger,
  });

  // Register plugins
  fastify.register(ConfigPlugin);
  fastify.register(LoggerPlugin);
  fastify.register(MirkoPlugin);

  // Register routes
  fastify.register(StatusRouter);
  fastify.register(EmbeddingRouter);
  fastify.register(PromptRouter);

  try {
    await fastify.ready();

    // Register sagas
    new EmbeddingSaga(fastify);
  } catch (e) {
    fastify.log.fatal(`Unable to initialize plugins due to ${e}`);
    process.exit(1);
  }

  fastify.listen(
    {
      port: fastify.config.port,
      host: "0.0.0.0",
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
}

server();
