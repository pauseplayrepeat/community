import { MediaRoom } from "@/components/media-room";

const ChannelsPage = () => {
    return ( 
        <div>
            <MediaRoom 
                chatId="test"
                video={true}
                audio={true}
            />
        </div>
     );
}

export default ChannelsPage;