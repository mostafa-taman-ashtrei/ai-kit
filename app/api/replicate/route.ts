import { NextResponse } from "next/server";
import Replicate from "replicate";
import { auth } from "@clerk/nextjs";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, generationType } = body;

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!prompt) return new NextResponse("Prompt is required", { status: 400 });


        const replicateModel = generationType === "video"
            ? "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f"
            : "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05";

        const response = await replicate.run(
            replicateModel,
            {
                input: {
                    prompt
                }
            }
        );

        return NextResponse.json(response);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};