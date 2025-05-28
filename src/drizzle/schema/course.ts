import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelper";
import { courseProductTable } from "./courseProduct";
import { userCourseAccessTable } from "./userCourseAccess";
import { courseSectionTable } from "./courseSection";

export const courseTable = pgTable("courses", {
    id,
    name: text().notNull(),
    description: text().notNull(),
    createAt,
    updateAt
});

export const courseRelationships = relations(courseTable, ({ many }) => ({
    courseProducts: many(courseProductTable),
    userCourseAccesses: many(userCourseAccessTable),
    courseSections: many(courseSectionTable)
}));