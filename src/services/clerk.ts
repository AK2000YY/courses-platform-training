import { UserRoles } from "@/drizzle/schema"
import { auth, clerkClient } from "@clerk/nextjs/server"

const client = await clerkClient()

export async function getCurrentUser() {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    return {
        userClerkId: userId,
        userId: sessionClaims?.dbId,
        role: sessionClaims?.role,
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
