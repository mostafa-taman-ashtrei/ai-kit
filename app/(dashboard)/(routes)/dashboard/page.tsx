import GradientText from "@/components/general/GradientText";

const Dashboard: React.FC = () => {
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
                    Explore the power of <GradientText text="A.I" />
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    All of your AI needs in one place. Start exploring for free now.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;