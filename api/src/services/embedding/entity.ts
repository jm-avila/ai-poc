import { PrimaryKey, Entity, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class Embedding {
  @PrimaryKey()
  public _id!: ObjectId;

  @Property({ nullable: false })
  public name: string;

  @Property({ nullable: false })
  public url: string;

  @Property({ default: false })
  public embedded?: boolean;

  public constructor(data: EmbeddingData) {
    this.name = data.name;
    this.url = data.url;
    if (typeof data.embedded === "boolean") {
      this.embedded = data.embedded;
    }
  }
}

export interface EmbeddingData {
  name: string;
  url: string;
  embedded?: boolean;
}
