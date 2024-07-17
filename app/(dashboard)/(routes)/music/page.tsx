"use client";

import { MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

import { formSchema } from "./constants";
import Heading from "@/components/Heading";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { toast } from "sonner";
import { useProModal } from "@/hooks/use-pro-modal";
import { getConversationMessages } from "@/lib/conversation";
import { SenderType } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ListMotion } from "@/components/motion/list-motion";
import SkeletonChatItem from "@/components/skeleton/skeleton-chat-item";

const MusicPage = () => {
  const { onOpen } = useProModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<
    | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        senderType: SenderType;
        content: string;
      }[]
    | []
  >([]);

  const getChats = async () => {
    try {
      const response = await axios.get("/api/chat?type=MUSIC");

      setChats(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      await getChats();
    })();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const formLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/music", values);

      await getChats();
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error(error.response.data);
        onOpen();
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music"
        icon={MessageSquare}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 md:px-6 px-3 focus-within:shadow-sm grid grid-cols-12 gap-2 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={formLoading}
                        placeholder="Piano solo"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2"
                disabled={formLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {formLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          <ListMotion className="flex flex-col-reverse gap-y-4">
            {loading &&
              [0, 0, 0, 0, 0].map((_, index: any) => (
                <SkeletonChatItem key={index} />
              ))}

            {chats?.length !== 0 &&
              !loading &&
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "p-8 w-full flex items-center gap-x-8 rounded-lg",
                    chat.senderType === "CLIENT"
                      ? " border border-black/10"
                      : "bg-muted"
                  )}
                >
                  {chat.senderType === "CLIENT" ? (
                    <UserAvatar />
                  ) : (
                    <BotAvatar />
                  )}
                  {chat.senderType === "CLIENT" ? (
                    <p className="text-sm">{chat.content}</p>
                  ) : (
                    <audio controls className="w-full ">
                      <source src={chat.content} />
                    </audio>
                  )}
                </div>
              ))}
          </ListMotion>

          {chats.length === 0 && !formLoading && !loading && (
            <Empty label="No music generated." />
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
