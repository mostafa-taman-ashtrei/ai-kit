import { Check, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { tools } from "@/constants";
import { useProModal } from "@/hooks/useProModal";
import { useState } from "react";

const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        try {
            setLoading(true);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold text-xl">
                            Upgrade to
                            <Badge
                                variant="gradient"
                                className="uppercase text-sm py-1"
                            >
                                A.I Kit Pro
                            </Badge>
                        </div>
                        <p className="text-slate-600">
                            A.I Kit Pro comes with <strong><u>Unlimited Generations</u></strong> for
                        </p>
                    </DialogTitle>
                    <DialogDescription className="text-center  text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card key={tool.href} className="p-3 rounded-full border-black/5 flex items-center justify-between shadow-lg bg-white dark:bg-gray-900 my-2">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-full", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-purple-900 w-5 h-5" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        disabled={loading}
                        onClick={handleSubscribe}
                        size="lg"
                        variant="gradient"
                        className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;