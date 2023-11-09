import DashboardMobileSidebar from "./DashboardMobileSidebar";
import ThemeTogglerButton from "./ThemeTogglerButton";
import UserAvatar from "./UserAvatar";
import { getApiLimitCount } from "@/lib/apiLimit";

const DashboardNavbar: React.FC = async () => {
    const apiLimit = await getApiLimitCount();

    return (
        <div className="flex items-center p-4">
            <DashboardMobileSidebar apiLimit={apiLimit} />
            <div className="flex w-full justify-end gap-4  items-center">
                <UserAvatar />
                <ThemeTogglerButton />
            </div>
        </div>
    );
};

export default DashboardNavbar;