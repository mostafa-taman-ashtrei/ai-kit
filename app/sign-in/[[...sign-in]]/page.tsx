import { SignIn as ClerkSignUp } from "@clerk/nextjs";

const SignIn: React.FC = () => {
    return (
        <div className="flex justify-center h-screen py-24 bg-gray-700">
            <ClerkSignUp />
        </div>
    );
};

export default SignIn;