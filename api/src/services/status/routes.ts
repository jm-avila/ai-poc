import { FastifyInstance } from "fastify";
import { StatusController } from "./";

export async function StatusRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get("/ping", StatusController.ping);
}
