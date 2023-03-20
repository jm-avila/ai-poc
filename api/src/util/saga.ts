import { EntityManager, EntityName, EventSubscriber } from "@mikro-orm/core";

export abstract class Saga<T = any> implements EventSubscriber<T> {
  public constructor(em: EntityManager) {
    em.getEventManager().registerSubscriber(this);
  }

  public abstract getSubscribedEntities(): EntityName<T>[];
}
