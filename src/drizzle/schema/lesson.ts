import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelper";
import { courseSectionTable } from "./courseSection";
import { relations } from "drizzle-orm";
import { userLessonCompleteTable } from "./userLessonComplete";

export const lessonStatus = ["public", "private", "preview"] as const;
export type LessonStatuses = (typeof lessonStatus)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatus);

export const lessonTable = pgTable("lessons", {
    id,
    name: text().notNull(),
    description: text(),
    youtubeVidioId: text().notNull(),
    order: integer().notNull(),
    status: lessonStatusEnum().notNull().default("public"),
    sectionId: uuid().notNull().references(() => courseSectionTable.id, { onDelete: "cascade" }),
    createAt,
    updateAt
});

export const lessonRelationships = relations(lessonTable, ({ one, many }) => ({
    courseSection: one(courseSectionTable, {
        fields: [lessonTable.sectionId],
        references: [courseSectionTable.id]
    }),
    userLessonComplete: many(userLessonCompleteTable)
}));