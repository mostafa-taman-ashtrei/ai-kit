import Heading from "@/components/general/Heading";
import { Settings as SettingsIcon } from "lucide-react";
import SubscriptionBtn from "@/components/dashboard/SubscriptionBtn";
import { checkUserSubscription } from "@/lib/subscription";

const Settings = async () => {
    const isPro = await checkUserSubscription();

    return (
        <div>
            <Heading
                title="Settings"
                description=""
                icon={SettingsIcon}
                iconColor="text-sky-700"
                bgColor="bg-sky-700/10"
            />


            <div className="px-4 mx-8 lg:px-8 space-y-4 content-center">

                <div className="grid gap-4 grid-cols-2 items-center">
                    <div className="text-muted-foreground">
                        {isPro ? "You are currently on a Pro plan." : "You are currently on a free plan."}
                    </div>

                    <SubscriptionBtn isPro={isPro} />
                </div>
            </div>
        </div>
    );
};

export default Settings;