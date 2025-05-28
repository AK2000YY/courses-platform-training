import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelper";
import { userTable } from "./user";
import { relations } from "drizzle-orm";
import { productTable } from "./product";

export const purchaseTable = pgTable("purchase", {
    id,
    pricePaidInCents: integer().notNull(),
    productDetails: jsonb().notNull().$type<{ name: string, description: string, imageUrl: string }>(),
    userId: uuid().notNull().references(() => userTable.id, { onDelete: "restrict" }),
    productId: uuid().notNull().references(() => productTable.id, { onDelete: "restrict" }),
    stripeSessionId: text().notNull(),
    refundedAt: timestamp({ withTimezone: true }),
    createAt,
    updateAt
});

export const purchaseRelationshipes = relations(purchaseTable, ({ one }) => ({
    user: one(userTable, {
        fields: [purchaseTable.userId],
        references: [userTable.id]
    }),
    product: one(productTable, {
        fields: [purchaseTable.productId],
        references: [productTable.id]
    })
}))