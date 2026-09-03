import { prisma } from "@/lib/generated/prisma";
import { EmailAddress } from "@clerk/nextjs/server";

interface CreatedUserInput {
    id : string;
    email: string;
    firstName: string | null;
    lastName: string | null;
}

export async function createUser(data:CreatedUserInput) {
    const user = await prisma.user.create({
        data:{
            id: data.id,
            email: data.email,
            firstName: data.firstName ,
            lastName: data.lastName
        }
    });

    return user;
}

export async function updateUser(data:CreatedUserInput) {
    const user = await prisma.user.update({
        where:{
            id: data.id,
        },
        data:{
            email: data.email,
            firstName: data.firstName ,
            lastName: data.lastName
        }
    });

    return user;
}

export async function deleteUser(id:string) {
    const user = await prisma.user.delete({
        where:{
            id
        }
    });

    return user;
}