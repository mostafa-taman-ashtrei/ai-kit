"use client";

import DashboardMobileSidebar from "./DashboardMobileSidebar";
import ThemeTogglerButton from "./ThemeTogglerButton";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const DashboardNavbar: React.FC = () => {
    const { resolvedTheme } = useTheme();
    const clerkTheme = resolvedTheme === "dark" ? { baseTheme: dark } : undefined;

    return (
        <div className="flex items-center p-4">
            <DashboardMobileSidebar />
            <div className="flex w-full justify-end gap-4  items-center">
                <UserButton
                    userProfileProps={{ appearance: clerkTheme }}
                    appearance={clerkTheme}
                    afterSignOutUrl="/"
                />

                <ThemeTogglerButton />
            </div>
        </div>
    );
};

export default DashboardNavbar;