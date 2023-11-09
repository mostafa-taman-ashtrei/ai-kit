import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { MAX_FREE_LIMIT } from "@/constants";
import { Progress } from "../ui/progress";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";

interface props {
    apiLimit: number;
}

const LimitBox: React.FC<props> = ({ apiLimit }) => {
    const [mounted, setMounted] = useState(false);
    const proModal = useProModal();

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimit} / {MAX_FREE_LIMIT} Free Generations
                        </p>
                        <Progress className="h-3" value={(apiLimit / MAX_FREE_LIMIT) * 100} />
                    </div>

                    <Button
                        variant="gradient"
                        className="w-full"
                        onClick={proModal.onOpen}
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 " />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default LimitBox;