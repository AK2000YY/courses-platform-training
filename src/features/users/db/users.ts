import { db } from "@/drizzle/db"
import { userTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm";
import { revalidateUserCache } from "./caches";

const insertUser = async (data: typeof userTable.$inferInsert) => {
    const [newUser] = await db.insert(userTable).values(data).returning().onConflictDoUpdate({
        target: [userTable.clerkUserId],
        set: data
    });
    revalidateUserCache(newUser.id);
    return newUser
}

const upadateUser = async (clerckUserId: string, data: Partial<typeof userTable.$inferInsert>) => {
    const [updatedUser] = await db
        .update(userTable)
        .set(data)
        .where(eq(userTable.clerkUserId, clerckUserId))
        .returning()
    revalidateUserCache(updatedUser.id);
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

    revalidateUserCache(deletedUser.id);

    return deletedUser
}


export { insertUser, upadateUser, deleteUser }