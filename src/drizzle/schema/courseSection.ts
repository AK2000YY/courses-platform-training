import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelper";
import { courseTable } from "./course";
import { relations } from "drizzle-orm";
import { lessonTable } from "./lesson";

export const courseSectionStatus = ["public", "private"] as const;
export type CourseSectionStatuses = (typeof courseSectionStatus)[number];
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatus);

export const courseSectionTable = pgTable("course_sections", {
    id,
    name: text().notNull(),
    status: courseSectionStatusEnum().notNull().default("public"),
    order: integer().notNull(),
    courseId: uuid().notNull().references(() => courseTable.id, { onDelete: "cascade" }),
    createAt,
    updateAt
})

export const courseSectionRelationships = relations(courseSectionTable, ({ one, many }) => ({
    course: one(courseTable, {
        fields: [courseSectionTable.courseId],
        references: [courseTable.id]
    }),
    lesson: many(lessonTable)
}))