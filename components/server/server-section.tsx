"use client"

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { PlusCircle } from "lucide-react";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
    label,
    role,
    sectionType,
    channelType,
    server,
}: ServerSectionProps) => {
    return ( 
        <div>
            <div className="flex">
                <p>
                    {label}
                </p>
                {role !== MemberRole.GUEST && sectionType === "channels"}
            </div>
            <div>
                {sectionType}
            </div>
            <div>
                {channelType}
            </div>
        </div>
     );
}