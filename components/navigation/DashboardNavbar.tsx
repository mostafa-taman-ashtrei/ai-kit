import DashboardMobileSidebar from "./DashboardMobileSidebar";
import ThemeTogglerButton from "./ThemeTogglerButton";
import { UserButton } from "@clerk/nextjs";

const DashboardNavbar: React.FC = () => {

    return (
        <div className="flex items-center p-4">
            <DashboardMobileSidebar />
            <div className="flex w-full justify-end gap-4  items-center">
                <UserButton afterSignOutUrl="/" />
                <ThemeTogglerButton />
            </div>
        </div>
    );
};

export default DashboardNavbar;