"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import Image from "next/image";

import { formSchema, amountOptions, resolutionOptions } from "./constants";
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
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { Download, Image as Img } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useProModal } from "@/hooks/use-pro-modal";
import { SenderType } from "@prisma/client";
import { ListMotion } from "@/components/motion/list-motion";
import SkeletonChatItem from "@/components/skeleton/skeleton-chat-item";

const ImagePage = () => {
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

  const [images, setImages] = useState<string[]>([]);

  const getChats = async () => {
    try {
      const response = await axios.get("/api/chat?type=IMAGE");

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
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // setImages([]);

      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

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
        title="Image Generation"
        description="Turn your prompt to an image"
        icon={Img}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss alps"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2 ">
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2 ">
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="p-20 ">
              <Loader />
            </div>
          )}
          {chats.length === 0 && !loading && !isLoading && (
            <Empty label="No images generated." />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                      {images.map((src) => (
                        <Card key={src} className=" rounded-lg overflow-hidden">
                          <div className="relative aspect-square">
                            <Image alt="Image" src={src} fill />
                          </div>

                          <CardFooter className="p-2">
                            <Button
                              variant="secondary"
                              className="w-full"
                              onClick={() => window.open(src)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </ListMotion>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
