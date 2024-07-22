import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

/**
 * Handles Stripe webhooks.
 *
 * This function is called when a Stripe webhook is received. It verifies the
 * webhook signature, extracts the event data, and updates the user's subscription
 * information in the database accordingly.
 *
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} - A response object with a status code of 200 or 400.
 */
export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        /**
         * Construct the Stripe event from the request body and signature.
         *
         * @example
         * const event = stripe.webhooks.constructEvent(
         *   '{"id": "evt_123456789", "object": "event", ...}',
         *   "v1=signature",
         *   "whsec_123456789"
         * );
         */
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

    } catch (error: any) {
        /**
         * Return a 400 response if the webhook signature is invalid.
         *
         * @example
         * return new NextResponse("Webhook Error: invalid signature", { status: 400 });
         */
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });

    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        /**
         * Retrieve the subscription associated with the completed checkout session.
         *
         * @example
         * const subscription = await stripe.subscriptions.retrieve("sub_123456789");
         */
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.userId) {
            /**
             * Return a 400 response if the user ID is missing from the session metadata.
             *
             * @example
             * return new NextResponse("User id is required", { status: 400 });
             */
            return new NextResponse("User id is required", { status: 400 });
        }

        /**
         * Create a new user subscription in the database.
         *
         * @example
         * await prismadb.userSubscription.create({
         *   data: {
         *     userId: "user_123456789",
         *     stripeSubscriptionId: "sub_123456789",
         *     stripeCustomerId: "cus_123456789",
         *     stripePriceId: "price_123456789",
         *     stripeCurrentPeriodEnd: new Date("2023-03-01T12:00:00.000Z")
         *   }
         * });
         */
        await prismadb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
            }
        });
    }

    if (event.type === "invoice.payment_succeeded") {
        /**
         * Retrieve the subscription associated with the successful invoice payment.
         *
         * @example
         * const subscription = await stripe.subscriptions.retrieve("sub_123456789");
         */
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        /**
         * Update the user subscription in the database with the latest price and period end dates.
         *
         * @example
         * await prismadb.userSubscription.update({
         *   where: {
         *     stripeSubscriptionId: "sub_123456789",
         *   },
         *   data: {
         *     stripePriceId: "price_123456789",
         *     stripeCurrentPeriodEnd: new Date("2023-03-01T12:00:00.000Z")
         *   }
         * });
         */
        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
            }
        });
    }

    /**
     * Return a 200 response to indicate successful processing of the webhook.
     *
     * @example
     * return new NextResponse(null, { status: 200 });
     */
    return new NextResponse(null, { status: 200 });

}
