"use client"

import { Hash } from "lucide-react";

interface ChatWelcomeProps {
    name: string;
    type: "channel" | "conversation";
}

export const ChatWelcome = ({
    name,
    type,
}: ChatWelcomeProps) => {
    return ( 
        <div>
            {type === "channel" && (
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
                    <Hash className="h-12 w-12 text-whte"/>
                </div>
                )}
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                    {type === "channel" ? "Welcome to #" : ""}{name}
                </p>
            
        </div>
     );
}