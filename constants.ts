import {
    Code,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Music,
    Settings,
    VideoIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 3

export const TOOLS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        color: "text-sky-500",
        bgColor: "text-sky-500/10"
    },

    {
        label: "Conversation",
        href: "/conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "text-violet-500/10"
    },


    {
        label: "Code Generation",
        href: "/code",
        icon: Code,
        color: "text-red-500",
        bgColor: "text-green-500/10"
    },

    {
        label: "Image Generation",
        href: "/image",
        icon: ImageIcon,
        color: "text-pink-500",
        bgColor: "text-pink-500/10"
    },



    {
        label: "Music Generation",
        href: "/music",
        icon: Music,
        color: "text-red-500",
        bgColor: "text-red-500/10"
    },

    {
        label: "Video Generation",
        href: "/video",
        icon: VideoIcon,
        color: "text-orange-500",
        bgColor: "text-orange-500/10"
    },


    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        color: "",
        bgColor: ""
    },
];