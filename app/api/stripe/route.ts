import { auth, currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

const settingsUrl = absoluteUrl("/settings");

export const GET = async () => {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });


        const userSubscription = await prismadb.userSubscription.findUnique({
            where: { userId }
        });


        // * Direct the user to the billing page if they are already subscribed.
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }


        // * If the user is not subscribed then create a subscription
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Ai Kit Pro",
                            description: "Unlimited AI Generations"
                        },
                        unit_amount: 800,
                        recurring: { interval: "month" }
                    },
                    quantity: 1,
                },
            ],
            metadata: { userId }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) return new NextResponse(`Stripe Error ${error.message}`, { status: 500 });
        return new NextResponse("Internal Error", { status: 500 });
    }
};