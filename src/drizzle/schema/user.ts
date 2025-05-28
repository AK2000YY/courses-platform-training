import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { userCourseAccessTable } from "./userCourseAccess";

export const userRole = ["user", "admin"] as const;
export type UserRoles = (typeof userRole)[number];
export const userRoleEnum = pgEnum("user_role", userRole);

export const userTable = pgTable("users", {
    id,
    clerkUserId: text().notNull().unique(),
    email: text().notNull().unique(),
    name: text().notNull(),
    imageUrl: text(),
    role: userRoleEnum().notNull().default("user"),
    deletedAt: timestamp({ withTimezone: true }),
    createAt,
    updateAt
});

export const userRelationshipes = relations(userTable, ({ many }) => ({
    userCourseAccess: many(userCourseAccessTable)
}))