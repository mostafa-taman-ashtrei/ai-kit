"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import Empty from "@/components/general/Empty";
import GenerateButton from "@/components/chat/GenerateButton";
import Heading from "@/components/general/Heading";
import { Input } from "@/components/ui/input";
import { Video as VideoIcon } from "lucide-react";
import axios from "axios";
import { formSchema } from "./constants";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const Video: React.FC = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string | undefined>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);
            const response = await axios.post("/api/replicate", { prompt: values.prompt, generationType: "video" });

            setVideo(response.data[0]);

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
                title="Video Generation"
                description="Turn your thoughts into videos with a click of a button."
                icon={VideoIcon}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />

            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="rounded-xl border w-full p-2 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Horses running in a field"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <GenerateButton isLoading={isLoading} />
                    </form>
                </Form>

                {!video && !isLoading && <Empty message="So far you have generated 0 videos ... start now 📽." />}

                {video && (
                    <video controls className="w-full aspect-video mt-8 rounded-xl">
                        <source src={video} />
                    </video>
                )}
            </div>
        </div>
    );
};

export default Video;