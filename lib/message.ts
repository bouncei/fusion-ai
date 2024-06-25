import { auth } from "@clerk/nextjs/server"
import { SenderType, conversationType } from "@prisma/client"
import prismadb from "./prismadb"
import { createConversation, getSectionConversation } from "./conversation"
import { PrismaClient } from '@prisma/client';
import { ObjectId } from "bson";



export const addMessageToConversation = async (conversationType: conversationType, senderType: SenderType, content: string) => {
    const { userId } = auth()
    const prisma = new PrismaClient();


    if (!userId) {
        return
    }

    const newConversation = await createConversation(conversationType)

    if (!newConversation || !newConversation.id) {
        throw new Error("Failed to create or retrieve conversation")
    }

    console.log("Creating message for conversation ID:", newConversation.id)

    const newMessage = await prismadb.message.create({
        data: {
            // id: new ObjectId().toString(),

            conversation: {
                connect: {
                    id: newConversation.id
                }
            },
            content,
            senderType,

        }
    })



    return newMessage
}

