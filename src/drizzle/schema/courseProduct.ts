import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { courseTable } from "./course";
import { productTable } from "./product";
import { createAt, updateAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

export const courseProductTable = pgTable("course_products", {
    courseId: uuid().references(() => courseTable.id, { onDelete: "restrict" }),
    productId: uuid().references(() => productTable.id, { onDelete: "cascade" }),
    createAt,
    updateAt
}, table => [
    primaryKey({ columns: [table.courseId, table.productId] })
]);

export const courseProductRelationshipes = relations(courseProductTable, ({ one }) => ({
    course: one(courseTable, {
        fields: [courseProductTable.courseId],
        references: [courseTable.id]
    }),
    product: one(productTable, {
        fields: [courseProductTable.productId],
        references: [productTable.id]
    })
}))