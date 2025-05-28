import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { courseTable } from "./course";
import { createAt, updateAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

export const userCourseAccessTable = pgTable("user_course_access", {
    userId: uuid().notNull().references(() => userTable.id, { onDelete: "cascade" }),
    courseId: uuid().notNull().references(() => courseTable.id, { onDelete: "cascade" }),
    createAt,
    updateAt
}, table => [
    primaryKey({ columns: [table.courseId, table.userId] })
]);

export const userCourseAcessRelation = relations(userCourseAccessTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userCourseAccessTable.userId],
        references: [userTable.id]
    }),
    course: one(courseTable, {
        fields: [userCourseAccessTable.courseId],
        references: [courseTable.id]
    })
}));