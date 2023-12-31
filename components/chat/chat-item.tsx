"use client"

import { Member, MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
  }

export const ChatItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery,
}: ChatItemProps) => {

    const fileType = fileUrl?.split(".").pop();

    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isOwner || isModerator);
    const canEditMessage = !deleted && (isAdmin || isOwner);
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;
    const isAudio = fileType === "mp3" || "wav" && fileUrl;



    return ( 
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full"> 
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                               {member.profile.name}
                            </p>
                    <ActionTooltip label={member.role}>
                        {roleIconMap[member.role]}
                    </ActionTooltip>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {timestamp}
                </span>
                </div>
                {isImage && (
                    <a 
                        href={fileUrl} target="_blank" rel="noreferrer">
                            <Image 
                                src={fileUrl}
                                width={200}
                                height={200}
                                alt="Image"
                            />
                        </a>
                )}
                {isPDF && (
                    <a 
                        href={fileUrl} target="_blank" rel="noreferrer">
                            <Image 
                                src={fileUrl}
                                width={200}
                                height={200}
                                alt="Image"
                            />
                        </a>
                )}
                {isAudio && (
                    <a href={fileUrl ?? undefined} target="_blank" rel="noreferrer">
                        <audio
                            src={fileUrl ?? undefined}
                            controls
                        />
                    </a>
                )}
                {content}
            </div>
            </div>
        </div>
     );
}