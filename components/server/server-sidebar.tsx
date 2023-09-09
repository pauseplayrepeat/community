import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findFirst({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return ( 
        <div className="flex flex-col h-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader 
                server={server}
                role={role}
            />
            <ScrollArea>
                <div>
                    Search
                </div>
                <Separator />
                {!!textChannels?.length && (
                    <div className="w-full">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channels"
                            
                        />
                        {textChannels.map((channel) => (
                            <ServerChannel 
                                key={channel.id}
                                channel={channel}
                                server={server}
                                role={role}
                            />
                        ))}
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="w-full">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Voice Channels"
                            
                        />
                        {audioChannels.map((channel) => (
                            <ServerChannel 
                                key={channel.id}
                                channel={channel}
                                server={server}
                                role={role}
                            />
                        ))}
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="w-full">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Video Channels"
                            
                        />
                        {videoChannels.map((channel) => (
                            <ServerChannel 
                                key={channel.id}
                                channel={channel}
                                server={server}
                                role={role}
                            />
                        ))}
                    </div>
                )}
                {!!members?.length && (
                    <div className="w-full">
                        <ServerSection 
                            sectionType="members"
                            role={role}
                            label="Members"
                            server={server}
                            
                        />
                        {members.map((member) => (
                            <ServerMember 
                                key={member.id}
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
     );
}

