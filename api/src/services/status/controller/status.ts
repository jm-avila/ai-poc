import { FastifyReply, FastifyRequest } from "fastify";

export class StatusController {
  public static ping = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    reply.send("pong");
  };
}
