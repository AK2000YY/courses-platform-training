import { db } from "@/drizzle/db";
import { UserRoles, userTable } from "@/drizzle/schema"
import { getUserIdTag } from "@/features/users/db/caches";
import { auth, clerkClient } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const client = await clerkClient()

export async function getCurrentUser({ allData = false }: { allData?: boolean }) {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    return {
        userClerkId: userId,
        userId: sessionClaims?.dbId,
        role: sessionClaims?.role,
        user: allData && sessionClaims?.dbId != null ?
            await getUser(sessionClaims?.dbId) :
            undefined,
        redirectToSignIn
    }
}

export function syncClerkUserMetadata(user: {
    id: string
    clerkUserId: string
    role: UserRoles
}) {
    return client.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata: {
            dbId: user.id,
            role: user.role,
        },
    })
}

async function getUser(id: string) {
    'use cache'
    cacheTag(getUserIdTag(id));
    console.log("called!");

    return db.query.userTable.findFirst({
        where: eq(userTable.id, id)
    });
}
