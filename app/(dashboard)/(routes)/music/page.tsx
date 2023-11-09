"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import Empty from "@/components/general/Empty";
import GenerateButton from "@/components/chat/GenerateButton";
import Heading from "@/components/general/Heading";
import { Input } from "@/components/ui/input";
import { Music as MusicIcon } from "lucide-react";
import axios from "axios";
import { formSchema } from "./formSchema";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useProModal } from "@/hooks/useProModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const Music: React.FC = () => {
    const router = useRouter();
    const { onOpen } = useProModal();
    const [music, setMusic] = useState<string | undefined>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);
            const response = await axios.post("/api/replicate", values);

            setMusic(response.data.audio);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) onOpen();
            else toast.error("Something went wrong ... try again later.");
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Music Generation"
                description="Generate your original music in a matter of seconds."
                icon={MusicIcon}
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
                                            placeholder="Violin Solo"
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

                {!music && !isLoading && <Empty message="What are you waiting for generate some music now 🎶🎵" />}

                {music && (
                    <audio controls className="w-full mt-8 rounded-xl bg-muted">
                        <source src={music} />
                    </audio>
                )}
            </div>
        </div>
    );
};

export default Music;