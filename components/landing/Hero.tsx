"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { useAuth } from "@clerk/nextjs";

const Hero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="font-bold py-28 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r gradient-primary">
                    <TypewriterComponent
                        options={{
                            strings: ["Chat Bot.", "Photo / Video Generation.", "Code Generation."],
                            autoStart: true,
                            loop: true,

                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                All your AI needs in one place.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="gradient" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Start Generating For Free
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required.
            </div>

            <div className="flex flex-col items-center justify-center mx-auto">
                <Image
                    src="/images/platform-screenshot.jpg"
                    className="object-cover object-center w-3/4 mb-10 border shadow-md g327"
                    alt="Platform Screenshot"
                    width={800}
                    height={800}
                />
            </div>
        </div>
    );
};

export default Hero;