"use client";

import { Button } from "@/components/ui/button";
import GradientText from "../general/GradientText";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import ThemeTogglerButton from "./ThemeTogglerButton";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingPageNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-baseline justify-between">
            <Link href="/" className="flex items-center">

                <h1 className={cn("text-2xl font-bold", font.className)}>
                    <GradientText text="A.I Kit" />
                </h1>
            </Link>

            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="secondary" className="rounded-full">
                        Get Started
                    </Button>
                </Link>
                <ThemeTogglerButton />
            </div>
        </nav>
    );
};

export default LandingPageNavbar;