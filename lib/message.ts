import { auth } from "@clerk/nextjs/server"
import { SenderType, conversationType } from "@prisma/client"
import prismadb from "./prismadb"
import { createConversation, getSectionConversation } from "./conversation"
import { PrismaClient } from '@prisma/client';
import { ObjectId } from "bson";


/**
 * Adds a message to a conversation.
 * 
 * @param {conversationType} conversationType - The type of conversation to add the message to.
 * @param {SenderType} senderType - The type of sender (e.g. user, system).
 * @param {string|string[]|[]} content - The content of the message. Can be a string, an array of strings, or an empty array.
 * 
 * @returns {Promise<any>} A promise that resolves with the newly created message.
 * 
 * @example
 * ```typescript
 * import { addMessageToConversation } from './addMessageToConversation';
 * 
 * const conversationType = 'private';
 * const senderType = 'user';
 * const content = 'Hello, world!';
 * 
 * addMessageToConversation(conversationType, senderType, content)
 *   .then((newMessage) => {
 *     console.log(newMessage);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 * ```
 */
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