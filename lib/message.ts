import { auth } from "@clerk/nextjs/server"
import { SenderType, conversationType } from "@prisma/client"
import prismadb from "./prismadb"
import { createConversation, getSectionConversation } from "./conversation"
import { PrismaClient } from '@prisma/client';
import { ObjectId } from "bson";



export const addMessageToConversation = async (conversationType: conversationType, senderType: SenderType, content: string | string[] | []) => {
    const { userId } = auth()
    const prisma = new PrismaClient();


    if (!userId) {
        return
    }

    const newConversation = await createConversation(conversationType)

    if (!newConversation || !newConversation.id) {
        throw new Error("Failed to create or retrieve conversation")
    }


    const newMessage = await prismadb.message.create({
        data: {
            conversation: {
                connect: {
                    id: newConversation.id
                }
            },
            content: typeof content === "string" ? content : "",
            images: typeof content !== "string" ? content : [],
            senderType,

        }
    })



    return newMessage
}

