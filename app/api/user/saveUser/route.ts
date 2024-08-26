import { saveUserToDb } from "@/actions/user";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from '@clerk/nextjs/server';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;


        const user = await clerkClient().users.getUser(userId);
        await saveUserToDb({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
        });
        return NextResponse.json({ message: "User saved successfully" });
    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({ message: "Error saving user", error }, { status: 500 });
    }

}