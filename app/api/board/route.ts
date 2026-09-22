import { prisma } from "@/lib/generated/prisma";
import getBoardsAndCardsByOrganisationId, { createCard } from "@/services/board.service";
import { getOrganisationById } from "@/services/organisations.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing organisation ID", { status: 400 });
  }

  try {
    const organisation = await getOrganisationById(id);
    const boardAndCards = await getBoardsAndCardsByOrganisationId(id);
    if (!organisation) {
      return new Response("Organisation not found", { status: 404 });
    }
    return Response.json({ organisation, boardAndCards }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error while fetching the organisation", {
      status: 500,
    });
  }
}



export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { boardId, title, description } = body;

    if (!boardId) {
      return NextResponse.json(
        {
          message: "Board ID is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        {
          message: "Card title is required",
        },
        {
          status: 400,
        },
      );
    }

    const card = await createCard(
      boardId,
      title.trim(),
      description?.trim(),
    );

    return NextResponse.json(card, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating card:", error);

    if (
      error instanceof Error &&
      error.message === "Board not found"
    ) {
      return NextResponse.json(
        {
          message: "Board not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create card",
      },
      {
        status: 500,
      },
    );
  }
}