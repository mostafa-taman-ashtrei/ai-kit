"use client";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

interface props {
    apiLimit: number;
    isPro: boolean;
}

const DashboardMobileSidebar: React.FC<props> = ({ apiLimit, isPro }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return null;

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar
                    apiLimit={apiLimit}
                    isPro={isPro}
                />
            </SheetContent>
        </Sheet>

    );
};

export default DashboardMobileSidebar;