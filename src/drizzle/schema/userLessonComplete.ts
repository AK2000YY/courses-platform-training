import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { lessonTable } from "./lesson";
import { createAt, updateAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

export const userLessonCompleteTable = pgTable("user_lesson_complete", {
    userId: uuid().notNull().references(() => userTable.id, { onDelete: "cascade" }),
    lessonId: uuid().notNull().references(() => lessonTable.id, { onDelete: "cascade" }),
    createAt,
    updateAt
}, table => [
    primaryKey({ columns: [table.userId, table.lessonId] })
]);

export const userLessonCompleteRelatioshipes = relations(userLessonCompleteTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userLessonCompleteTable.userId],
        references: [userTable.id]
    }),
    lesson: one(lessonTable, {
        fields: [userLessonCompleteTable.lessonId],
        references: [lessonTable.id]
    })
}));