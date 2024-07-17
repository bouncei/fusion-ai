import { auth } from "@clerk/nextjs/server"
import prismadb from "./prismadb"
import { conversationType } from "@prisma/client"
import { ObjectId } from "bson"


export const createConversation = async (type: conversationType) => {
    const { userId } = auth()

    if (!userId) {
        return
    }

    const existingConvo = await getSectionConversation(type)

    if (!existingConvo) {
        const convo = await prismadb.conversation.create({
            data: {
                // id: new ObjectId().toString(),
                userId,
                type,
            }
        })
        return convo

    } else {
        return existingConvo
    }
}

export const getSectionConversation = async (type: conversationType) => {
    const { userId } = auth()

    if (!userId) {
        return
    }


    const conversation = await prismadb.conversation.findFirst({
        where: {
            userId,
            type
        },
        include: {
            messages: true
        }

    })

    if (!conversation) {
        return null
    } else {
        return conversation
    }
}


export const checkExistingConversation = async (type: conversationType) => {
    const { userId } = auth()

    if (!userId) {
        return
    }

    const conversation = await prismadb.conversation.findFirst({
        where: {
            userId,
            type
        },
        include: {
            messages: true
        }

    })

    if (conversation) {
        return true
    } else {
        return false
    }

}

export const getConversationMessages = async (type: conversationType) => {
    const { userId } = auth()

    if (!userId) {
        return
    }

    const existingConvo = await getSectionConversation(type)

    if (!existingConvo) {
        const conversation = await prismadb.conversation.findFirst({
            where: {
                userId,
                type
            },
            orderBy: {
                createdAt: "asc",
            },
            include: {
                messages: true
            }

        })


        return conversation?.messages

    } else {
        return existingConvo?.messages
    }


}