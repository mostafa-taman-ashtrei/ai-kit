"use client";

import { MAX_FREE_LIMIT, tools } from "@/constants";

import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import GradientText from "@/components/general/GradientText";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
    const router = useRouter();

    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
                    Explore the power of <GradientText text="A.I" />
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    All of your AI needs in one place. Start exploring now ... you get {MAX_FREE_LIMIT} free generations.
                </p>
            </div>

            <div className="px-2 md:px-20 lg:px-32 grid grid-cols-2 gap-4">
                {
                    tools.map((tool) => <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-2 py-4 hover:p-4 bg-muted flex items-center justify-between hover:shadow-md hover:shadow-gray-500 hover:dark:shadow-black  transition cursor-pointer">
                        <div className="flex items-center gap-x-2">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </Card>)
                }
            </div>
        </div>
    );
};

export default Dashboard;