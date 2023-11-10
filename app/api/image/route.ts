import { checkApiLimit, upApiLimit } from "@/lib/apiLimit";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { checkUserSubscription } from "@/lib/subscription";

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!openAi.apiKey) return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

        const freeTrial = await checkApiLimit();
        const isPro = await checkUserSubscription();

        if (!freeTrial && !isPro) return NextResponse.json("You reached the free accounf limit", { status: 403 });

        const response = await openAi.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        if (!isPro) await upApiLimit();
        return NextResponse.json(response.data);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};