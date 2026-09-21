"use client";

import { ArrowLeft, ArrowRight, Kanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser, 
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";
  const isOrgPage = pathname.startsWith("/organisation/");

  if (isOrgPage) {
    return (
      <div className="mx-3 mt-3 rounded-xl border border-gray-200 bg-white/95 p-2 shadow-sm backdrop-blur-sm sm:mx-5 sm:mt-5">
        <div className="flex min-h-11 items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/dashboard">
              <Button
                size="sm"
                variant="outline"
                className="h-9 gap-1.5 rounded-lg border-gray-200 px-2.5 text-gray-700 shadow-none transition-all hover:border-gray-300 hover:bg-gray-50 sm:px-3"
              >
                <ArrowLeft className="h-4 w-4" />
                <p className="hidden text-sm font-medium sm:block">
                  Go to Dashboard
                </p>
              </Button>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-gray-50"
            >
              <Kanban className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6" />
              <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                FlowBoard
              </span>
            </Link>
          </div>

          <div className="px-1 sm:px-2">
            <UserButton />
          </div>
        </div>
      </div>
    );
  }

  if (isDashboard) {
    return (
      <div className="mx-3 mt-3 rounded-xl border border-gray-200 bg-white/95 p-2 shadow-sm backdrop-blur-sm sm:mx-5 sm:mt-5">
        <div className="flex min-h-11 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-gray-50"
          >
            <Kanban className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6" />
            <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              FlowBoard
            </span>
          </Link>

          {isSignedIn ? (
            <div className="px-1 sm:px-2">
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <SignInButton>
                <Button
                  variant="ghost"
                  className="h-9 rounded-lg px-3 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:text-sm"
                >
                  Signin
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant="default"
                  className="h-9 rounded-lg px-3.5 text-xs font-medium shadow-sm sm:text-sm"
                >
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
    <div className="mx-3 mt-3 rounded-xl border border-gray-200 bg-white/95 p-2 shadow-sm backdrop-blur-sm sm:mx-5 sm:mt-5">
      <div className="flex min-h-11 items-center justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-gray-50"
          >
            <Kanban className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6" />
            <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              FlowBoard
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden max-w-48 truncate text-xs font-medium text-gray-500 sm:block sm:text-sm">
                Welcome,{" "}
                {user.firstName ?? user.emailAddresses[0].emailAddress}
              </span>

              <Link href="/dashboard">
                <Button
                  size="sm"
                  className="h-9 gap-1.5 rounded-lg px-3 text-xs font-medium shadow-sm transition-all hover:shadow-md sm:text-sm"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <SignInButton>
                <Button
                  variant="ghost"
                  className="h-9 rounded-lg px-3 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:text-sm"
                >
                  Signin
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant="default"
                  className="h-9 rounded-lg px-3.5 text-xs font-medium shadow-sm sm:text-sm"
                >
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

