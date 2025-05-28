import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelper";
import { courseProductTable } from "./courseProduct";

export const productStatuses = ["public", "private"] as const;
export type productStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_status", productStatuses);

export const productTable = pgTable("products", {
    id,
    name: text().notNull(),
    description: text().notNull(),
    imageUrl: text().notNull(),
    priceInDollars: integer().notNull(),
    status: productStatusEnum().notNull().default("public"),
    createAt,
    updateAt
});

export const productRelationships = relations(productTable, ({ many }) => ({
    courseProducts: many(courseProductTable)
}))