import { db } from "@/drizzle/db"
import { userTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm";


const insertUser = async (data: typeof userTable.$inferInsert) => {
    const [newUser] = await db.insert(userTable).values(data).returning().onConflictDoUpdate({
        target: [userTable.clerkUserId],
        set: data
    });

    return newUser
}

const upadateUser = async (clerckUserId: string, data: Partial<typeof userTable.$inferInsert>) => {
    const [updatedUser] = await db
        .update(userTable)
        .set(data)
        .where(eq(userTable.clerkUserId, clerckUserId))
        .returning()

    return updatedUser
}

const deleteUser = async (clerckUserId: string) => {
    const [deletedUser] = await db
        .update(userTable)
        .set({
            deletedAt: new Date(),
            email: "deletedAccounet@deleted.com",
            name: "deleted",
            clerkUserId: "deleted",
            imageUrl: null,
        })
        .where(eq(userTable.clerkUserId, clerckUserId))
        .returning()

    return deletedUser
}


export { insertUser, upadateUser, deleteUser }