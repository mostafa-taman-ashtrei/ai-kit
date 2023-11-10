import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import GradientText from "../general/GradientText";
import Link from "next/link";
import { tools } from "@/constants";

const Features: React.FC = () => {
    return (
        <div className="px-20 pb-20 my-10">

            <h2 id="features" className=" text-2xl font-semibold tracking-tighter text-center lg:text-7xl md:text-6xl">
                <GradientText text="Features" />
            </h2>

            <p className="mx-auto text-md text-center text-gray-500 font-normal leading-relaxed fs521 lg:w-2/3">
                We offer a variety of different features, all of which you can explore for free. We are
                always working on new features as of right now these features are stable and working.
                These features include
            </p>


            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
                {tools.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                    >
                        <Card className="border-2 border-purple-900 hover:shadow-lg cursor-pointer hover:shadow-purple-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-x-2 text-purple-600">
                                    <item.icon />
                                    <p className="text-lg">{item.label}</p>
                                </CardTitle>

                                <CardContent className="pt-4 px-0 text-gray-700">
                                    {item.desc}
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div >










    );
};

export default Features;