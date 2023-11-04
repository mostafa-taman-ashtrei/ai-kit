import { UserButton } from "@clerk/nextjs";

const Dashboard: React.FC = () => {
    return (
        <main className="flex flex-row items-center justify-between p-5">
            Dashboard
            <UserButton afterSignOutUrl="/" />
        </main>
    );
};

export default Dashboard;