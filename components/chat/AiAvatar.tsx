import { Avatar, AvatarImage } from "../ui/avatar";

const AiAvatar = () => {
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage className="p-1" src="/images/bot.png" />
        </Avatar>
    );
};

export default AiAvatar;