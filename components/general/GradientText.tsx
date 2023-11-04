import React, { FC } from "react";

interface props {
    text: string;
}

const GradientText: FC<props> = ({ text }) => {
    return (
        <p className="bg-gradient-to-br gradient-primary inline-block text-transparent bg-clip-text">
            {text}
        </p>
    );
};

export default GradientText;