"use client";

import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface props {
    isPro: boolean;
}

const SubscriptionBtn: React.FC<props> = ({ isPro = false }) => {
    const [loading, setLoading] = useState(false);


    const handleClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant={isPro ? "outline" : "gradient"} disabled={loading} onClick={handleClick} >
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 " />}
        </Button>
    );
};

export default SubscriptionBtn;