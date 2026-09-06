"use client"

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"

export default function(){
    const {user} = useUser();
    let [msg, setmsg] = useState<string>("");
    

    useEffect(()=>{
        async function getData(){
            let res = await fetch("/api/dashboard");
            let data = await res.json();
             setmsg(data.msg);
        }
        getData();
    }, [])
    return <div>
        <Navbar/>
        <div>
            <div className="mb-6 sm:mb-8">
                <p className=" text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back, {user?.firstName}</p>
                <p className="text-gray-600">Here's all the board you can work on</p>
            </div>
            <div>
                
            </div>
        </div>
    </div>
}