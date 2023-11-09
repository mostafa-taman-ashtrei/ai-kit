import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const instructionMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};

export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages, type } = body;


        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!openAi.apiKey) return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        if (!messages) return new NextResponse("Messages are required", { status: 400 });


        const messageArray = typeof type === "undefined"
            ? messages
            : type === "code"
                ? [instructionMessage, ...messages]
                : messages;

        const completion = await openAi.chat.completions.create({
            messages: messageArray,
            model: "gpt-3.5-turbo",
        });

        return NextResponse.json(completion.choices[0].message);
    } catch {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};