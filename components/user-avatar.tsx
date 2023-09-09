import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
};

export const UserAvatar = ({
  src,
  className
}: UserAvatarProps) => {
  return (
    <Avatar className={cn(
      "h-5 w-5 md:h-10 md:w-10",
      className
    )}>
      <AvatarImage src={src} />
    </Avatar>
  )
}