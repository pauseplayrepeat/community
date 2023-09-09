import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";

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
               </div>
               <div>
                    Future Messages
               </div>
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