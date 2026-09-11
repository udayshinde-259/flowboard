"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  Activity,
  Filter,
  Grid3X3,
  Kanban,
  LayoutDashboard,
  Loader2,
  PanelsTopLeft,
  Plus,
  Rows3Icon,
  ShieldCheck,
  SquareSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export default function Dashboard() {
  type Organisation = {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };

  const { user } = useUser();
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [viemode, setViewmode] = useState<"grid" | "list">("grid");
  const [showBoardDialoge, setShowBoardDialoge] = useState(false);
  const [boardError, setBoardError] = useState("");
  const [loading, setLoading] = useState(true);
  const [creatingBoard, setCreatingBoard] = useState(false);

  async function fetchOrganisations() {
  try {
    const response = await axios.get("/api/dashboard");

    setOrganisations(response.data ?? []);
  } catch (error) {
    console.error("Failed to fetch organisations:", error);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchOrganisations();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="mx-3 mt-4 sm:mx-4">
          <div className="rounded-md border border-gray-200 bg-white px-4 py-6 shadow-sm">
            <p className="text-sm font-medium text-gray-600">
              Unauthorized
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-3 sm:mb-5">
        <Navbar />
      </div>

      {/* Welcome */}
      <div className="mx-3 mb-4 sm:mx-4 sm:mb-6">
        <p className="mb-1 text-lg font-semibold text-gray-900 sm:mb-2 sm:text-2xl">
          Welcome Back, {user?.firstName}
        </p>

        <p className="text-xs text-gray-500 sm:text-sm">
          Here's all the boards that you can work on.
        </p>
      </div>

      {/* Statistics */}
      <div className="mx-3 mb-5 grid grid-cols-2 gap-3 sm:mx-4 sm:gap-4 lg:mb-6 lg:grid-cols-4">
        <div className="flex min-w-0 items-center justify-between rounded-md bg-white p-3 shadow-sm sm:p-4 lg:p-5">
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-xs text-gray-600 sm:text-sm lg:text-base">
              Total Boards
            </p>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
              {organisations.length}
            </p>
          </div>

          <div className="shrink-0">
            <Kanban className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between rounded-md bg-white p-3 shadow-sm sm:p-4 lg:p-5">
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-xs text-gray-600 sm:text-sm lg:text-base">
              Active Boards
            </p>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
              {organisations.length}
            </p>
          </div>

          <div className="shrink-0">
            <LayoutDashboard className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between rounded-md bg-white p-3 shadow-sm sm:p-4 lg:p-5">
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-xs text-gray-600 sm:text-sm lg:text-base">
              Recent Activity
            </p>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
              -
            </p>
          </div>

          <div className="shrink-0">
            <Activity className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between rounded-md bg-white p-3 shadow-sm sm:p-4 lg:p-5">
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-xs text-gray-600 sm:text-sm lg:text-base">
              Total Tasks
            </p>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
              -
            </p>
          </div>

          <div className="shrink-0">
            <ShieldCheck className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
          </div>
        </div>
      </div>

      {/* Your Boards Header */}
      <div className="mx-3 mb-2 rounded-md border-b bg-white px-3 py-2 shadow-sm sm:mx-4 sm:mb-4 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-gray-900 sm:text-xl">
              Your Boards
            </p>

            <p className="text-[11px] text-gray-400 sm:text-sm">
              Manage your Boards and Tasks
            </p>
          </div>

          {/* Desktop Controls */}
          <div>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex items-center rounded-md border bg-white p-1">
                <Button
                  variant={viemode == "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => {
                    setViewmode("grid");
                  }}
                >
                  <Grid3X3 />
                </Button>

                <Button
                  variant={viemode == "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => {
                    setViewmode("list");
                  }}
                >
                  <Rows3Icon />
                </Button>
              </div>

              <Button variant="outline" size="icon">
                <Filter />
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  setShowBoardDialoge(true);
                }}
              >
                <Plus />
                Create Board
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mb-4 px-3 sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center rounded-md border bg-white p-1">
            <Button
              variant={viemode == "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => {
                setViewmode("grid");
              }}
            >
              <Grid3X3 />
            </Button>

            <Button
              variant={viemode == "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => {
                setViewmode("list");
              }}
            >
              <Rows3Icon />
            </Button>
          </div>

          <Button
            variant="outline"
            size="default"
            className="w-full"
          >
            <Filter />
          </Button>

          <Button
            variant="outline"
            size="default"
            className="col-span-2 w-full"
            onClick={() => {
              setShowBoardDialoge(true);
            }}
          >
            <Plus />
            Create Board
          </Button>
        </div>
      </div>

      {/* Organisations */}
      {loading ? (
        <div className="mx-3 mb-6 flex items-center justify-center rounded-md border bg-white py-10 sm:mx-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin" />
            Loading boards...
          </div>
        </div>
        ):organisations.length === 0 ? (
          <div className="mx-3 mb-6 rounded-md border border-dashed bg-white px-4 py-8 text-center sm:mx-4">
            <p className="text-sm text-gray-500">
              No Organisations created yet
            </p>
          </div>
        ) : viemode === "grid" ? (
          /* Grid View */
          <div className="mx-3 mb-6 grid grid-cols-1 gap-3 sm:mx-4 sm:grid-cols-2 sm:gap-4 lg:gap-5">
            {organisations.map((organisation) => (
              <Link key={organisation.id} href={`/boards/${organisation.id}`}>
                <Card
                  key={organisation.id}
                  className="mb-3 h-full border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <CardContent className="p-3 sm:p-4 lg:p-5">
                    <div>
                      <div className="mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="shrink-0 rounded-md bg-blue-50 p-1.5 sm:p-2">
                            <SquareSquare className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-semibold leading-tight text-gray-900 sm:text-lg">
                              {organisation.name}
                            </p>

                            <p className="mt-1 h-10 w-full overflow-y-auto rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs leading-4 text-gray-500 scrollbar-thin sm:h-12 sm:px-2.5 sm:py-2 sm:text-sm">
                              {organisation.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-col gap-0.5 border-t pt-2 text-[10px] text-gray-400 sm:flex-row sm:gap-4 sm:text-xs">
                        <span>
                          Created:{" "}
                          {new Date(
                            organisation.createdAt
                          ).toLocaleDateString()}
                        </span>

                        <span>
                          Updated:{" "}
                          {new Date(
                            organisation.updatedAt
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="mx-3 mb-6 sm:mx-4">
            {organisations.map((organisation) => (
              <Link key={organisation.id} href={`/boards/${organisation.id}`}>
                <Card
                  key={organisation.id}
                  className="mb-3 border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0 rounded-md bg-blue-50 p-1.5">
                            <SquareSquare className="h-5 w-5 text-blue-500" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                              {organisation.name}
                            </p>

                            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-gray-500 sm:text-sm">
                              {organisation.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row gap-4 text-[10px] text-gray-400 sm:flex-col sm:items-end sm:gap-1 sm:text-xs">
                        <span>
                          <span className="font-medium text-gray-500">
                            Created:
                          </span>{" "}
                          {new Date(
                            organisation.createdAt
                          ).toLocaleDateString()}
                        </span>

                        <span>
                          <span className="font-medium text-gray-500">
                            Updated:
                          </span>{" "}
                          {new Date(
                            organisation.updatedAt
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

      {/* Create Board Dialog */}
      <Dialog
        open={showBoardDialoge}
        onOpenChange={setShowBoardDialoge}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg p-4 sm:p-6">
          <DialogHeader>
            <p className="text-lg font-semibold text-gray-900 sm:text-xl">
              Create New Board
            </p>

            <p className="text-xs text-gray-500 sm:text-sm">
              Create a new board to organize your tasks.
            </p>
          </DialogHeader>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              setBoardError("");
              setCreatingBoard(true);

              const formData = new FormData(e.currentTarget);

              const name = formData.get("name") as string;
              const description = formData.get("description") as string;

              try {
                const response = await axios.post("/api/dashboard", {
                  name,
                  description,
                });

                const organisation = response.data;

                setOrganisations((prev) => [...prev, organisation]);

                setShowBoardDialoge(false);
              } catch (error: any) {
                console.error(error);

                setBoardError(
                  error.response?.data?.message ||
                    "Something went wrong while creating the board."
                );
              } finally {
                setCreatingBoard(false);
              }
            }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Board Name */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Organisation Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter board name"
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Enter board description"
                defaultValue="This board has no description"
                rows={4}
                onFocus={(e) => e.currentTarget.select()}
                className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Error */}
            {boardError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
                <p className="text-sm text-red-600">{boardError}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={creatingBoard}
                onClick={() => setShowBoardDialoge(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={creatingBoard}>
                {creatingBoard ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Board"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}