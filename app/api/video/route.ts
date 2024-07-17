import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubsctiption } from "@/lib/subscription";
import { addMessageToConversation } from "@/lib/message";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
})


export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { prompt } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        if (!prompt) {
            return new NextResponse("Prompt is required(min: 2 characters)", { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubsctiption()


        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        const input = {
            prompt: prompt
        };

        const response: any = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });


        if (!isPro) {
            await increaseApiLimit()
        }


        await Promise.all([
            await addMessageToConversation("MUSIC", "CLIENT", prompt),
            await addMessageToConversation("MUSIC", "AI", response.data[0])
        ])


        return NextResponse.json(response)


    } catch (error) {
        console.log("[VIDEO POST REQUEST]:", error)
        return new NextResponse("Internal Error:", { status: 500 })
    }

}