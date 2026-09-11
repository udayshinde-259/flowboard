"use client";

import { ArrowRight, Kanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";
  const isBoards = pathname.startsWith("/baord/");

  if (isDashboard) {
    return (
      <div className="m-4 p-2 border-b-2 rounded-sm shadow-sm bg-white">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm"
          >
            <Kanban className="h-4 w-4 sm:h-6 sm:w-6 text-blue-400 cursor-pointer" />
            <span className="font-bold text-xl cursor-pointer">FlowBoard</span>
          </Link>
          {isSignedIn ? (
            <div className="px-2 mx-2 ">
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center ">
              <SignInButton>
                <Button variant="ghost" className="text-xs sm:text-sm">
                  Signin
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="default" className="text-xs sm:text-sm">
                  Signup
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 p-2 border-b-2 rounded-sm">
      <div className="flex justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm"
          >
            <Kanban className="h-4 w-4 sm:h-6 sm:w-6 text-blue-400 cursor-pointer" />
            <span className="font-bold text-xl cursor-pointer">FlowBoard</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Welcome, {user.firstName ?? user.emailAddresses[0].emailAddress}
              </span>
              <Link href="/dashboard" className="">
                <Button size="sm" className="text-xs sm:text-sm">
                  Go to Dashboard <ArrowRight />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center ">
              <SignInButton>
                <Button variant="ghost" className="text-xs sm:text-sm">
                  Signin
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="default" className="text-xs sm:text-sm">
                  Signup
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
