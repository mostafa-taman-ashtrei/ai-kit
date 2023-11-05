import Image from "next/image";

interface props {
    message: string;
}
const Empty: React.FC<props> = ({ message }) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-36 w-36 mb-4">
                <Image src="/images/bot.png" fill alt="Bot" />
            </div>
            <p className="text-muted-foreground text-lg text-center">
                {message}
            </p>
        </div>
    );
};

export default Empty;