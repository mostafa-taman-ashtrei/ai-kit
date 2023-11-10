"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const CrispChat: React.FC = () => {
    useEffect(() => {
        Crisp.configure("2188e14f-f58d-45c1-a204-614210ff8a86");
    }, []);

    return null;
};

export default CrispChat;