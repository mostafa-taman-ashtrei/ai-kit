import { Bot, Code, ImageIcon, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_LIMIT = 10;

export const tools = [
    {
        label: "Chat",
        icon: Bot,
        href: "/chat",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        desc: "Chat with a smart AI model. The model will answer your questions, give you information and way more."
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        desc: "Generate creative musical pieces with any instrument you want in just a few seconds."
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        desc: "Want more than just images, we got you covered. With AI KIT you can generate full fledged videos."
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        desc: "If you want more than just images we git you covered with our video generation model you can generate full fledged videos."
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        desc: "Clean & efficent code is at your fingertips ... all you have to do is say the word."
    },
];