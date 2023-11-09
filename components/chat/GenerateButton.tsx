import { Loader2, Wand2 } from "lucide-react";

import { Button } from "../ui/button";

interface props {
    isLoading: boolean;
}

const GenerateButton: React.FC<props> = ({ isLoading }) => {
    return (
        <Button
            className="col-span-12 lg:col-span-2 w-full bg-gradient-to-br gradient-primary font-bold hover:bg-transparent hover:bg-gradient-to-bl rounded-xl"
            type="submit"
            disabled={isLoading}
            size="icon"
        >
            {
                isLoading
                    ? <div className="flex gap-2 items-center flex-row">
                        <Loader2 className="animate-spin" />
                        <span>
                            Generating
                        </span>
                    </div>
                    : <div className="flex gap-2 items-center flex-row">
                        <Wand2 />
                        <span>
                            Generate
                        </span>
                    </div>
            }
        </Button>
    );
};

export default GenerateButton;