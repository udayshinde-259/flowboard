"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function BoardPage() {
  interface OrgsProps {
    id: string;
    name: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface CardType {
    id: string;
    title: string;
    description?: string | null;
  }

  interface Board {
    id: string;
    title: string;
    cards: CardType[];
  }

  const { id } = useParams<{ id: string }>();

  const [organisation, setOrganisation] = useState<OrgsProps | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);

  // Dialog state
  const [openAddCardDialog, setOpenAddCardDialog] = useState(false);

  // Currently selected board
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  // Card creation state
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    async function fetchOrganisation() {
      try {
        const response = await axios.get("/api/board", {
          params: {
            id,
          },
        });

        const org = response.data.organisation;
        const boardData = response.data.boardAndCards;

        if (org) {
          setOrganisation(org);
        }

        if (boardData) {
          setBoards(boardData);
        }
      } catch (error) {
        console.error("Failed to fetch organisation:", error);
      }
    }

    if (id) {
      fetchOrganisation();
    }
  }, [id]);

  return (
    <div>
      <Navbar />

      <div className="m-4">
        {/* Organisation name */}
        <div className="mb-6 px-4">
          <h1 className="text-xl font-semibold">
            {organisation?.name}
          </h1>
        </div>

        {/* Boards */}
        <div className="w-full overflow-x-auto pb-4">
  <div className="flex min-w-max items-start gap-5 px-1">
    {boards.map((board) => (
      <div
        key={board.id}
        className="
          flex
          w-80
          shrink-0
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          shadow-sm
        "
      >
        {/* Board Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

            <h2 className="truncate text-sm font-semibold text-gray-800">
              {board.title}
            </h2>

            {/* Card count */}
            <span
              className="
                rounded-full
                bg-gray-200
                px-2
                py-0.5
                text-[11px]
                font-medium
                text-gray-600
              "
            >
              {board.cards?.length ?? 0}
            </span>
          </div>

          {/* Board menu */}
          <button
            type="button"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-gray-400
              transition
              hover:bg-gray-200
              hover:text-gray-700
            "
          >
            •••
          </button>
        </div>

        {/* Cards Container */}
        <div className="flex min-h-30 flex-col gap-2.5 p-3">
            {(board.cards ?? []).length > 0 ? (
                board.cards.map((card) => (
                <div
                    key={card.id}
                    className="
                    group
                    cursor-pointer
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    p-3
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-gray-300
                    hover:shadow-md
                    "
                >
                    {/* Card title */}
                    <h3 className="text-sm font-medium leading-5 text-gray-800">
                    {card.title}
                    </h3>

                    {/* Description */}
                    {card.description && (
                    <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-gray-500">
                        {card.description}
                    </p>
                    )}

                    {/* Card footer */}
                    <div className="mt-3 flex items-center justify-between">
                    <span
                        className="
                        rounded-md
                        bg-blue-50
                        px-2
                        py-1
                        text-[10px]
                        font-medium
                        text-blue-600
                        "
                    >
                        Task
                    </span>

                    <span className="text-[10px] text-gray-400">
                        #
                        {card.id.slice(-4)}
                    </span>
                    </div>
                </div>
                ))
            ) : (
                /* Empty State */
                <div
                className="
                    flex
                    min-h-[100px]
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-dashed
                    border-gray-300
                    bg-gray-100/60
                    px-4
                    text-center
                "
                >
                <p className="text-xs text-gray-400">
                    No cards yet
                </p>
                </div>
            )}
            </div>

            {/* Add Card */}
            <div className="px-3 pb-3">
            <Button
                variant="ghost"
                className="
                w-full
                justify-start
                gap-2
                rounded-lg
                text-sm
                font-medium
                text-gray-500
                transition
                hover:bg-gray-200
                hover:text-gray-800
                "
                onClick={() => {
                setSelectedBoardId(board.id);
                setCardError("");
                setOpenAddCardDialog(true);
                }}
            >
                <span className="text-lg leading-none">+</span>
                Add card
            </Button>
            </div>
        </div>
        ))}
    </div>
    </div>
    </div>

      {/* Add Card Dialog */}
      <Dialog
        open={openAddCardDialog}
        onOpenChange={setOpenAddCardDialog}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg p-4 sm:p-6">
          <DialogHeader>
            <p className="text-lg font-semibold text-gray-900 sm:text-xl">
              Create New Card
            </p>

            <p className="text-xs text-gray-500 sm:text-sm">
              Create a new card and add it to this board.
            </p>
          </DialogHeader>

          <form
            onSubmit={async (e) => {
                e.preventDefault();

                const form = e.currentTarget;

                setCardError("");

                if (!selectedBoardId) {
                    setCardError("No board selected.");
                    return;
                }

                setIsCreatingCard(true);

                const formData = new FormData(form);

                const title = formData.get("title") as string;
                const description = formData.get("description") as string;

                try {
                    const response = await axios.post("/api/board", {
                    boardId: selectedBoardId,
                    title,
                    description,
                    });

                    const newCard: CardType = response.data;

                    setBoards((prev) =>
                    prev.map((board) =>
                        board.id === selectedBoardId
                        ? {
                            ...board,
                            cards: [...(board.cards ?? []), newCard],
                            }
                        : board,
                    ),
                    );

                    setOpenAddCardDialog(false);
                    setSelectedBoardId(null);

                    // Reset the form
                    form.reset();
                } catch (error: any) {
                    console.error(error);

                    setCardError(
                    error.response?.data?.message ||
                        "Something went wrong while creating the card.",
                    );
                } finally {
                    setIsCreatingCard(false);
                }
                }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Card Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Card Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter card title"
                required
                className="
                  w-full
                  rounded-md
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
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
                placeholder="Enter card description"
                defaultValue="This card has no description"
                rows={4}
                onFocus={(e) => e.currentTarget.select()}
                className="
                  w-full
                  resize-none
                  rounded-md
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Error */}
            {cardError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
                <p className="text-sm text-red-600">
                  {cardError}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isCreatingCard}
                onClick={() => {
                  setOpenAddCardDialog(false);
                  setCardError("");
                }}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isCreatingCard}>
                {isCreatingCard ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Card"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
