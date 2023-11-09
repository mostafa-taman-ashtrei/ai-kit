import { Loader2, LucideIcon, Wand2 } from "lucide-react";

import { Button } from "../ui/button";

interface props {
    isLoading: boolean;
    text?: string;
    icon?: LucideIcon;
}

const GenerateButton: React.FC<props> = ({ isLoading, icon: Icon, text }) => {
    return (
        <Button
            className="col-span-12 lg:col-span-2 w-full font-bold"
            variant="gradient"
            type="submit"
            disabled={isLoading}
            size="icon"
        >
            {
                isLoading
                    ? <div className="flex gap-2 items-center flex-row">
                        {!Icon ? <Loader2 className="animate-spin" /> : <Icon className="animate-bounce" />}

                        <span>
                            {!text ? "Generating" : `${text}ing`}
                        </span>
                    </div>
                    : <div className="flex gap-2 items-center flex-row">
                        {!Icon ? <Wand2 /> : <Icon />}

                        <span>
                            {!text ? "Generate" : `${text}`}
                        </span>
                    </div>
            }
        </Button>
    );
};

export default GenerateButton;