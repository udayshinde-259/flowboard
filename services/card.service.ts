import { prisma } from "@/lib/generated/prisma";


export async function createCard(
  boardId: string,
  title: string,
  description?: string,
) {
  // Check if board exists
  const board = await prisma.boards.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  // Create card
  const card = await prisma.card.create({
    data: {
      title,
      description: description || null,
      boardId,
    },
  });

  return card;
}