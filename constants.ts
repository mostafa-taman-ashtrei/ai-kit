import { Bot, Code, ImageIcon, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_LIMIT = 1;

export const tools = [
    {
        label: "Chat",
        icon: Bot,
        href: "/chat",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
];