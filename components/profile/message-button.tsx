// components/MessageButton.tsx
"use client"

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useParams } from 'next/navigation';

interface MessageButtonProps {
  profileId: string;
}

const MessageButton: React.FC<MessageButtonProps> = ({ profileId }) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/conversations/${profileId}`);
  };

  return (
    <Button onClick={onClick}>
      Start Conversation
    </Button>
  );
};

export default MessageButton;