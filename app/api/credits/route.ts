import { getUserCredits } from "@/actions/credits";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    const responseBody = JSON.stringify({ credits: 0, error: "unauthorized" });
    return new NextResponse(responseBody, {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const userCredits = await getUserCredits(userId);
    if (!userCredits || !userCredits.free || typeof userCredits.free.left !== 'number') {
      throw new Error("Invalid user credits data");
    }
    const creditsLeft = userCredits.free.left;
    const responseBody = JSON.stringify({ credits: creditsLeft });

    console.log("credits ===> ", creditsLeft)

    return new NextResponse(responseBody, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const responseBody = JSON.stringify({ error: (error as Error).message || "Internal server error" });
    return new NextResponse(responseBody, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}