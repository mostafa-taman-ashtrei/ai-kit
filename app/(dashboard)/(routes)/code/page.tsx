"use client";

import * as z from "zod";

import { Code as CodeIcon, Copy, Loader2, Wand2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import AiAvatar from "@/components/chat/AiAvatar";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessage } from "openai/resources/chat/completions";
import Empty from "@/components/general/Empty";
import Heading from "@/components/general/Heading";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import UserAvatar from "@/components/chat/UserAvatar";
import axios from "axios";
import { cn } from "@/lib/utils";
import { formSchema } from "./constants";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const Code: React.FC = () => {
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

            const response = await axios.post("/api/code", { messages: newMessages });

            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();

        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            router.refresh();
        }
    };

    const handleCopy = (content: string | null) => {
        if (content === null) return;
        navigator.clipboard.writeText(content);
        toast.success("Content Copied");
    };

    return (
        <div>
            <Heading
                title="Code Generation"
                description="Generate clean and efficent code in just a few seconds saving yourself a lot of time and effort."
                icon={CodeIcon}
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
                                                placeholder="Center a div using tailwind css."
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
                                                Generating
                                            </span>
                                        </div>
                                        : <div className="flex gap-2 items-center flex-row">
                                            <Wand2 />
                                            <span>
                                                Generate
                                            </span>
                                        </div>
                                }
                            </Button>
                        </form>
                    </Form>
                </div>

                {messages.length === 0 && !isLoading && <Empty message="Your wish is my command tell me what you need." />}

                <div className="flex flex-col-reverse gap-y-4 mx-6 my-4">
                    {messages.map((message) => (
                        <div
                            key={message.content}
                            className={cn(
                                "p-2 w-full flex items-start gap-x-8 rounded-xl",
                                message.role === "user" ? "bg-gray-300 dark:bg-gray-900 border-2 border-black/10 dark:border-gray-700 dark:border-4:" : "bg-muted border",
                            )}
                        >
                            {
                                message.role === "user"
                                    ? <UserAvatar />
                                    : <div className="flex flex-col gap-2 justify-between items-center">
                                        <AiAvatar />
                                        <Copy
                                            className="cursor-pointer hover:text-slate-400"
                                            onClick={() => handleCopy(message.content)}
                                        />
                                    </div>
                            }

                            <ReactMarkdown
                                components={{
                                    pre: ({ ...props }) => (
                                        <div className="overflow-auto w-full my-2 bg-gray-300 dark:bg-gray-900 p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code: ({ ...props }) => (<code className="bg-black/10 rounded-lg p-1" {...props} />)
                                }}
                                className="text-sm overflow-hidden leading-7"
                            >
                                {message.content || ""}
                            </ReactMarkdown>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Code;