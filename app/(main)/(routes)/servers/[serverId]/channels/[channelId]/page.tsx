import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelsPage = async ({
    params,
}: ChannelIdPageProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    });

    if (!channel || !member) {
        redirect("/") 
    }

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full "> 
            <div>
               <ChatHeader 
                    name={channel.name}
                    serverId={channel.serverId}
                    type="channel"
               />
               <div>
               {channel.type === "VIDEO" && (
                    <MediaRoom
                        chatId={channel.id}
                        video={true}
                        audio={true}
                    />
                )}
                {channel.type === "AUDIO" && (
                    <MediaRoom
                        chatId={channel.id}
                        video={false}
                        audio={true}
                    />
                )}
               </div>
               <ChatMessages 
                    name={channel.name}
                    member={member}
                    chatId={channel.id}
                    apiUrl="/api/socket/messages"
                    socketUrl="/api/socket"
                    socketQuery={{
                        channelId: channel.id,
                        serverId: channel.serverId,
                    }}
                    paramKey="channelId"
                    paramValue={channel.id}
                    type="channel"
               />
               <ChatInput
                    apiUrl="/api/socket/messages"
                    query={{ 
                        channelId: channel.id,
                        serverId: channel.serverId,
                    }}
                    name={channel.name}
                    type="channel"
                />
            </div>
        </div>
        
     );
}

export default ChannelsPage;



{/* <MediaRoom 
                    chatId="test"
                    video={true}
                    audio={true}
                /> */}