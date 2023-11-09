import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!openAi.apiKey) return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

        const response = await openAi.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};