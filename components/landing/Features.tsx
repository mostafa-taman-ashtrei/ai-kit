import GradientText from "../general/GradientText";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { tools } from "@/constants";

const Features: React.FC = () => {
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100 bg-gray-300">
            <div className="container max-w-xl p-6 py-12 mx-auto  lg:px-8 lg:max-w-7xl">
                <div>
                    <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">
                        <GradientText text="Features" />
                    </h2>

                    <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">
                        We offer a variety of different features, all of which you can explore <strong><u>for free</u></strong>.
                    </p>
                </div>

                <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <div className="mt-12 space-y-12">
                            {tools.map((tool) => <div className="flex" key={tool.label}>
                                <div className="flex-shrink-0">
                                    <div className={cn("flex items-center justify-center  rounded-md p-5 ", tool.bgColor)}>
                                        <tool.icon className={cn("w-9 h-9", tool.color)} />

                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium leadi dark:text-gray-50">{tool.label}</h4>
                                    <p className=" dark:text-gray-400">
                                        {tool.desc}
                                    </p>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-0">
                        <Image
                            src="/images/features-screenshot.jpg"
                            width={560}
                            height={680}
                            alt="features screenshot"
                            className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;