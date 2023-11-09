import { MAX_FREE_LIMIT } from "@/constants";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (typeof userId === "undefined" || userId === null) return false;

    const userLimit = await prismadb.userApiLimit.findUnique({
        where: { userId }
    });

    if (!userLimit || userLimit.count < MAX_FREE_LIMIT) return true;

    return false;
};

export const upApiLimit = async () => {
    const { userId } = auth();

    if (typeof userId === "undefined" || userId === null) return;

    const userLimit = await prismadb.userApiLimit.findUnique(
        { where: { userId } }
    );

    if (userLimit) {
        await prismadb.userApiLimit.update({
            where: { userId },
            data: { count: userLimit.count + 1 }
        });
    }

    else {
        await prismadb.userApiLimit.create({
            data: { userId, count: 1 }
        });
    }
};