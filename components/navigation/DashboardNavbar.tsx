import DashboardMobileSidebar from "./DashboardMobileSidebar";
import ThemeTogglerButton from "./ThemeTogglerButton";
import UserAvatar from "./UserAvatar";
import { checkUserSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/apiLimit";

const DashboardNavbar: React.FC = async () => {
    const apiLimit = await getApiLimitCount();
    const isPro = await checkUserSubscription();

    return (
        <div className="flex items-center p-4">
            <DashboardMobileSidebar
                apiLimit={apiLimit}
                isPro={isPro}
            />
            <div className="flex w-full justify-end gap-4 items-center">
                <UserAvatar />
                <ThemeTogglerButton />
            </div>
        </div>
    );
};

export default DashboardNavbar;