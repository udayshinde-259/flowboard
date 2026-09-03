"use client"

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react"

export default function(){
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
    </div>
}