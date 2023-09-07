import { MediaRoom } from "@/components/media-room";

const ServerPage = () => {
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

export default ServerPage;
