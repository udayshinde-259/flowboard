import { createUser, deleteUser, updateUser } from "@/services/user.service";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    
    try {
        const evt = await verifyWebhook(req);
        

        if(evt.type === "user.created"){
            const user = evt.data;
            const email = user.email_addresses[0]?.email_address;

        if (!email) {
            return new Response("User has no email", {
            status: 400,
        });
        }

        const createdUser = await createUser({
            id: user.id,
            email: user.email_addresses[0].email_address,
            firstName: user.first_name,
            lastName: user.last_name
        })
        
        return new Response("Webhook received and user is created",  {
      status: 200, 
    });
        } 
        
        if(evt.type === "user.updated"){
            const user = evt.data;
            const email = user.email_addresses[0]?.email_address;

        if (!email) {
            return new Response("User has no email", {
            status: 400,
        });
        }

        const updatedUser = await updateUser({
            id: user.id,
            email: user.email_addresses[0].email_address,
            firstName: user.first_name,
            lastName: user.last_name
        })
        
        return new Response("Webhook received and updated the user",  {
      status: 200, 
    });
        }
        
        if(evt.type === "user.deleted"){
            const user = evt.data;
            
            const userId = user.id;
            if(!userId){
                return new Response("unauthorized", {status:400})
            }

            const updateUser = await deleteUser(userId)
        
        return new Response("Webhook received and updated the user",  {
      status: 200, 
    });
        }   
    } catch (error) {
        console.error(error)

        return new Response("something went wrong", {status: 400})
    }
}