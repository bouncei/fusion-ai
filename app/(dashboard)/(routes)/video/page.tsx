"use client";

import { MessageSquare, Video } from "lucide-react";
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
import { SenderType } from "@prisma/client";

const VideoPage = () => {
  const { onOpen } = useProModal();
  const router = useRouter();

  const [video, setVideo] = useState<string>();
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

      await getChats();
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

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // setVideo(undefined);
      const response = await axios.post("/api/video", values);

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
        title="Video Generation"
        description="Turn your prompt into video"
        icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                        disabled={isLoading}
                        placeholder="Fishes swimming around a coral reef"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label="No video generated." />}
          {video && (
            <video
              controls
              className="w-full aspect-video rounded-lg border border-black mt-8"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
