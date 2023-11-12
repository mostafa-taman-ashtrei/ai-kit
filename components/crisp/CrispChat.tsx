"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const CrispChat: React.FC = () => {
    useEffect(() => {
        Crisp.configure("eefa0932-da21-419b-adb2-43ee51306880");
    }, []);

    return null;
};

export default CrispChat;