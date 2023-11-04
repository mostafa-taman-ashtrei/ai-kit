import { SignUp as ClerkSignUp } from "@clerk/nextjs";

const SignUp: React.FC = () => {
    return (
        <div className="flex justify-center h-screen py-24 bg-gray-700">
            <ClerkSignUp />
        </div>
    );
};

export default SignUp;