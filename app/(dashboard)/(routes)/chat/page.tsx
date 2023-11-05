"use client";

import * as z from "zod";

import { Bot, Loader2, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import AiAvatar from "@/components/chat/AiAvatar";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessage } from "openai/resources/chat/completions";
import Empty from "@/components/general/Empty";
import Heading from "@/components/general/Heading";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/chat/UserAvatar";
import axios from "axios";
import { cn } from "@/lib/utils";
import { formSchema } from "./constants";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const Chat: React.FC = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { prompt: "" }
    });

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessage = { role: "user", content: values.prompt };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/chat", { messages: newMessages });

            setMessages((prev) => [...prev, userMessage, response.data]);
            form.reset();
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Chat"
                description="Chat with best models. Ask any question & you will recieve an answer in just a few seconds"
                icon={Bot}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            className="rounded-xl border w-full p-2 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                placeholder="How can I calculate the radius of the earth?"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full bg-gradient-to-br gradient-primary font-bold hover:bg-transparent hover:bg-gradient-to-bl rounded-xl"
                                type="submit"
                                disabled={isLoading}
                                size="icon"
                            >
                                {
                                    isLoading
                                        ? <div className="flex gap-2 items-center flex-row">
                                            <Loader2 className="animate-spin" />
                                            <span>
                                                Sending
                                            </span>
                                        </div>
                                        : <div className="flex gap-2 items-center flex-row">
                                            <Send />
                                            <span>
                                                Send
                                            </span>
                                        </div>
                                }


                            </Button>
                        </form>
                    </Form>
                </div>

                {isLoading && <div className="py-48 animate-pulse mt-4 rounded-lg w-full flex items-center justify-center bg-muted" />}
                {messages.length === 0 && !isLoading && <Empty message="Your chat is empty ... type something to get started" />}

                {
                    !isLoading && <div className="flex flex-col-reverse gap-y-4 mx-6 my-4">
                        {messages.map((message) => (
                            <div
                                key={message.content}
                                className={cn(
                                    "p-2 w-full flex items-center gap-x-8 rounded-xl",
                                    message.role === "user" ? "bg-white dark:bg-gray-700 border border-black/10" : "bg-muted",
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <AiAvatar />}
                                <p className="text-sm">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Chat;