"use client";

import * as z from "zod";

import { Bot, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import AiAvatar from "@/components/chat/AiAvatar";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessage } from "openai/resources/chat/completions";
import Heading from "@/components/general/Heading";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/chat/UserAvatar";
import { cn } from "@/lib/utils";
import { formSchema } from "./constants";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const Chat: React.FC = () => {
    const [messages] = useState<ChatCompletionMessage[]>([
        {
            content: "How can I calculate the radius of the earth?",
            role: "user",
        },
        {
            content: "Eratosthenes estimated the circumference of the Earth to be about 40,000 km. He also knew that the circumference of a circle was equal to 2 times π (3.1415...) times the radius of the circle. (C = 2πr) With this information, Eratosthenes inferred that the Earth's radius was 6366 km.",
            role: "assistant",
        },
        {
            content: "Does time go faster at the top of a building compared to the bottom?",
            role: "user",
        },
        {
            content: "Yes, time goes faster the farther away you are from the earth's surface compared to the time on the surface of the earth. This effect is known as gravitational time dilation. It is predicted by Einsteins theory of General Relativity and has by verified multiple times by experiments. Gravitational time dilation occurs because objects with a lot of mass create a strong gravitational field. The gravitational field is really a curving of space and time. The stronger the gravity, the more spacetime curves, and the slower time itself proceeds. We should note here, however, that an observer in the strong gravity experiences his time as running normal.",
            role: "assistant",
        }
    ]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = () => { };

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
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full bg-gradient-to-br gradient-primary font-bold hover:bg-transparent hover:bg-gradient-to-bl rounded-xl"
                                type="submit"
                                disabled={isLoading}
                                size="icon"
                            >

                                <div className="flex gap-2 items-center flex-row">
                                    <Send />
                                    <span>
                                        Send
                                    </span>
                                </div>
                            </Button>
                        </form>
                    </Form>
                </div>


                <div className="flex flex-col-reverse gap-y-4 mx-6 my-4">
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
            </div>
        </div>
    );
};

export default Chat;