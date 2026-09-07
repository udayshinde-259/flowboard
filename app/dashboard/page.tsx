"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Filter, Grid3X3, Kanban, Plus, Rows3Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useUser();
  let [msg, setmsg] = useState<string>("");
  const [viemode, setViewmode] = useState<"grid" | "list">("grid");

  return (
    <div>
      <div className="mb-6">
        <Navbar />
      </div>

      <div className="mb-6 mx-4">
        <p className=" text-base sm:text-2xl font-bold text-black mb-2">
          Welcome Back, {user?.firstName}
        </p>
        <p className="text-gray-500 text-sm sm:text-base font-bold">
          Here's all the board you can work on
        </p>
      </div>

      <div className="mb-6 mx-4 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:justify-between">
        <div className=" w-40 h-15 sm:w-72 rounded-sm sm:h-32 flex p-2 sm:p-4 items-center justify-between bg-white shadow-md">
          <div className="flex flex-col gap ">
            <p className="text-xl sm:text-2xl">Total Boards</p>
            <p className="text-2xl sm:text-3xl font-bold">2</p>
          </div>
          <div>
            <Kanban className="h-2 w-2 sm:h-6 sm:w-6 text-blue-400" />
          </div>
        </div>
        <div className=" w-40 h-15 sm:w-72 rounded-sm sm:h-32 flex p-2 sm:p-4 items-center justify-between   bg-white shadow-md">
          <div className="flex flex-col gap ">
            <p className="text-xl sm:text-2xl">Active Boards</p>
            <p className="text-2xl sm:text-3xl font-bold">2</p>
          </div>
          <div>
            <Kanban className="h-2 w-2 sm:h-6 sm:w-6 text-blue-400" />
          </div>
        </div>
        <div className=" w-40 h-15 sm:w-72 rounded-sm sm:h-32 flex p-2 sm:p-4 items-center justify-between   bg-white shadow-md">
          <div className="flex flex-col gap ">
            <p className="text-xl sm:text-2xl">Recent Activity</p>
            <p className="text-2xl sm:text-3xl font-bold">2</p>
          </div>
          <div>
            <Kanban className="h-2 w-2 sm:h-6 sm:w-6 text-blue-400" />
          </div>
        </div>
        <div className=" w-40 h-15 sm:w-72 rounded-sm sm:h-32 flex p-2 sm:p-4 items-center justify-between   bg-white shadow-md">
          <div className="flex flex-col gap ">
            <p className="text-xl sm:text-2xl">Total Tasks</p>
            <p className="text-2xl sm:text-3xl font-bold">2</p>
          </div>
          <div>
            <Kanban className="h-2 w-2 sm:h-6 sm:w-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="mb-2 sm:mb-6 mx-4 p-2 border-b-2 rounded-sm shadow-sm bg-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-md sm:text-2xl font-normal">Your Boards</p>
            <p className="text-sm sm:text-xl font-normal">
              Manage your Boards and Tasks
            </p>
          </div>
          
        <div>

            <div className=" gap-4 hidden sm:flex">
                <div>
                    <Button
                        variant={viemode == "grid" ? "default" : "ghost"}
                        size="icon-lg"
                        onClick={()=>{setViewmode("grid")}}
                    >
                        <Grid3X3 />
                    </Button>

                    <Button
                        variant={viemode == "list" ? "default" : "ghost"}
                        size="lg"
                        onClick={()=>{setViewmode("list")}}
                    >
                        <Rows3Icon />
                    </Button>
                </div>
            <Button
                variant="outline"
                size="lg"
            >
                <Filter />
            </Button>

            <Button
                variant="outline"
                size="lg"
            >
                <Plus />
                Create Board
            </Button>
            </div>   
            
        </div>
        </div>
      </div>

      <div className=" sm:hidden mb-6">
        <div className="grid gap-2 mx-4">
                <div className="flex items-center bg-white" onClick={()=>setViewmode(viemode == "grid" ? "list" : "grid")}>
                    <Button
                        variant={viemode == "grid" ? "default" : "ghost"}
                        size="icon-lg"
                        onClick={()=>{setViewmode("grid")}}
                    >
                        <Grid3X3 />
                    </Button>

                    <Button
                        variant={viemode == "list" ? "default" : "ghost"}
                        size="lg"
                        onClick={()=>{setViewmode("list")}}
                    >
                        <Rows3Icon />
                    </Button>
                </div>
            <Button
                variant="outline"
                size="lg"
            >
                <Filter />
            </Button>

            <Button
                variant="outline"
                size="lg"
            >
                <Plus />
                Create Board
            </Button>
            </div>   
      </div>
    </div>
  );
}
