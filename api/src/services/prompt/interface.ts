import { Static, Type } from "@sinclair/typebox";

const InsertUrlData = Type.Object({
  url: Type.String(),
});

const InsertUrlListData = Type.Object({
  urls: Type.Array(Type.String()),
});

export const InsertData = Type.Union([InsertUrlData, InsertUrlListData]);

export type InsertDataType = Static<typeof InsertData>;

export const Question = Type.Object({
  question: Type.String(),
});

export type QuestionType = Static<typeof Question>;
