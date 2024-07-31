/**
 * Constants and data structures for application tools.
 *
 * This module exports an array of tool objects, each representing a feature or functionality of the application.
 *
 * @module tools
 */

import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

/**
 * Maximum number of free counts allowed.
 *
 * @constant {number}
 */
export const MAX_FREE_COUNTS = 3;

/**
 * Array of tool objects.
 *
 * Each tool object contains metadata for a specific application feature or functionality.
 *
 * @constant {object[]}
 * @property {string} label - Human-readable label for the tool.
 * @property {string} href - URL path for the tool.
 * @property {React.Component} icon - Icon component for the tool.
 * @property {string} color - Foreground color for the tool.
 * @property {string} bgColor - Background color for the tool.
 *
 * @example
 * import { tools } from './tools';
 *
 * tools.forEach((tool) => {
 *   console.log(tool.label); // Output: Conversation, Code Generation, ...
 * });
 */
export const tools = [
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
  },

  {
    label: "Code Generation",
    href: "/code",
    icon: Code,
    color: "text-green-500",
    bgColor: "text-green-500/10",
  },

  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "text-pink-500/10",
  },

  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-red-500",
    bgColor: "text-red-500/10",
  },

  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "text-orange-500/10",
  },
];
