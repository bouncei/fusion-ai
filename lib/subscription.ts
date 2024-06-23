import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000

export const checkSubsctiption = async () => {
    const { userId } = auth()

    if (!userId) {
        return false
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    })

    if (!userSubscription) {
        return false
    }

    const isValid = userSubscription.stripeCustomerId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now() // GIVING THE USER AN EXTRA ONE DAY GRACE

    return !!isValid
}