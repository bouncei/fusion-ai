import { checkExistingConversation, getConversationMessages } from "@/lib/conversation";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { conversationType } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "bson"



export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { type } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const existingConversation = await checkExistingConversation(type)

        if (existingConversation) {
            return new NextResponse("Conversation already exists", { status: 400 })
        }

        const conversation = await prismadb.conversation.create({
            data: {
                id: new ObjectId().toString(),
                userId,
                type,
            }
        })

        return NextResponse.json({ conversation })

    } catch (error) {
        console.log("[CHAT POST REQUEST ERROR]:", error)
        return new NextResponse("Internal Error:", { status: 500 })
    }

}

export async function GET(req: NextRequest) {
    try {
        // TODO: ADD FILTERING OPTIONS
        const { userId } = auth()
        const { searchParams } = new URL(req.url);

        const type = searchParams.get('type');

        console.log("query", type)
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })

        }

        if (!type) {
            return new NextResponse("Missing type param", { status: 400 })
        }

        const messages = await getConversationMessages(type as conversationType)


        return NextResponse.json(messages)

    } catch (error) {
        console.log("[CHAT GET REQUEST ERROR]:", error)
        return new NextResponse("Internal Error:", { status: 500 })
    }



}
