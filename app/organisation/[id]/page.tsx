"use client"

import { Navbar } from "@/components/ui/navbar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function BoardPage(){
    interface OrgsProps {
        id: string,
        name: string,
        description?:string | null,
        createdAt: Date,
        updatedAt: Date,
    }
    const { id } = useParams<{ id: string }>();
    const [organisation, setOrganisation] = useState<OrgsProps | null>(null);

    useEffect(()=>{
        async function fetchOrganisations() {
            const response = await axios.get("/api/organisation",{ 
                params:{
                    id,
                }}
            )
            const data = response.data;
            if(data){
                console.log(data)
                setOrganisation(data);
            }
        }
        fetchOrganisations();
    }, [])

    
    return(
    <div >
        <Navbar/>
        <div className="m-4">
            <div className="mb-6 px-4">
                {organisation?.name}
            </div>
            <div className="w-full overflow-x-auto">
                <div className="flex gap-4 min-w-max items-start">
                    
                    

                </div>
            </div>
        </div>
    </div>
)
}
