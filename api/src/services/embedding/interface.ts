import { Static, Type } from "@sinclair/typebox";

export const EmbeddingItem = Type.Object({
  id: Type.Optional(Type.String()),
  name: Type.String(),
  url: Type.String(),
  embedded: Type.Optional(Type.Boolean()),
});

export type EmbeddingItemType = Static<typeof EmbeddingItem>;
