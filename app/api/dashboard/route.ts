import {
  getOrganisations,
  postOrganisations,
} from "@/services/organisations.service";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const organisations = await getOrganisations(user.id);
  return Response.json(organisations, {status:201});
}

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  let userId = user.id;
  console.log(userId)

  
  try {
    const { name, description } = await req.json();
    const organisation = await postOrganisations(name, description, userId);

    return Response.json(organisation, { status: 201 });
  } catch (error) {
    console.log(error)
    return new Response("Error while creating the board", { status: 400 });
  }
}
