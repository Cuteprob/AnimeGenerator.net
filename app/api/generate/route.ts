import { checkUserCredits, consumeUserCredits } from "@/actions/credits";
import { GenerateAnime } from "@/actions/generateImage";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { prompt } = body;
    const { userId } = auth();
    const creditsNeed = 10;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!prompt) {
        return new NextResponse("Missing prompt", { status: 400 });
    }

    const isCreditsEnough = await checkUserCredits(userId, creditsNeed);
    if(!isCreditsEnough) {
        return new NextResponse("Not enough credits", { status: 400 });
    }

    try {
        const ret = await GenerateAnime(userId,prompt);
        await consumeUserCredits(userId, creditsNeed);
        const resp = JSON.stringify({id: ret.id});
        return new NextResponse(resp, {
            status: 200,
            headers: {"Content-Type": "application/json"}
        })
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An error occurred while processing your request.";
        const errorResponse = JSON.stringify({
            error: true,
            msg: errorMessage,
        });

        return new NextResponse(errorResponse, {
            status: 500,
            headers: {"Content-Type": "application/json"}
        });
    }
}