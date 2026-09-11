import { prisma } from "@/lib/generated/prisma";


export async function getOrganisations(userId:string){
    const organisations = await prisma.organizations.findMany({
        where: {
            membership:{
                some:{
                    userId,
                }
            }
        }
    })
    return organisations;
}

export async function postOrganisations(name: string, description:string, userId: string) {
    const organisation = await prisma.organizations.create({
        data:{
            name,
            description,

            membership:{
                create:{
                    userId,
                    role: "OWNER"
                },
            },
        }
    })
    
    return organisation;
}