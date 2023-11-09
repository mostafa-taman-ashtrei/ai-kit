"use client";

import { Bot, Code, Cog, Image, LayoutDashboard, Music, Video } from "lucide-react";

import GradientText from "../general/GradientText";
import LimitBox from "../dashboard/LimitBox";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

interface props {
    apiLimit: number;
}

const Sidebar: React.FC<props> = ({ apiLimit }) => {
    const pathname = usePathname();

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-sky-500"
        },
        {
            label: "Chat",
            icon: Bot,
            href: "/chat",
            color: "text-violet-500",
        },
        {
            label: "Code",
            icon: Code,
            href: "/code",
            color: "text-violet-500",
        },
        {
            label: "Image",
            icon: Image,
            href: "/image",
            color: "text-violet-500",
        },
        {
            label: "Music",
            icon: Music,
            href: "/music",
            color: "text-violet-500",
        },
        {
            label: "Video",
            icon: Video,
            href: "/video",
            color: "text-violet-500",
        },
        {
            label: "Settings",
            icon: Cog,
            href: "/settings",
            color: "text-sky-500"
        },
    ];

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-800 text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <h1 className={cn("text-2xl font-bold", poppins.className)}>
                        <GradientText text="A.I Kit" />
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <LimitBox
                apiLimit={apiLimit}
            />
        </div>
    );
};

export default Sidebar;