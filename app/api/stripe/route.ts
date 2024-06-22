import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings")

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser()

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if (userSubscription && userSubscription.stripeCustomerId) {
            // Redirects user to the billling page so they can cancel their current subscription
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            })
            return NextResponse.redirect(JSON.stringify({
                url: stripeSession.url
            }))
        }

        // User first subscription
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "FusionAI Pro",
                            description: "Unlimited AI Generations"
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        },


                    },
                    quantity: 1,
                }],
            metadata: {
                userId
            }


        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))




        if (!userSubscription) {
            return new NextResponse("No subscription found", { status: 404 })
        }

    } catch (error) {
        console.log("[STRIPE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })

    }



}

export async function POST(req: Request) {
    try {
        const { userId } = auth();

    } catch (error) {
        console.log("[STRIPE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })

    }


}