import { timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const createAt = timestamp({ withTimezone: true }).defaultNow();
export const updateAt = timestamp({ withTimezone: true }).defaultNow().$onUpdate(() => new Date)