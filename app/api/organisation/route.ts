import { getOrganisationById } from "@/services/organisations.service";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Missing organisation ID", { status: 400 });
    }

    try{
        const organisation = await getOrganisationById(id);
        if (!organisation) {
            return new Response("Organisation not found", { status: 404 });
        }
        return Response.json(organisation, {status: 200});
    } catch (error) {
        console.error(error);
        return new Response("Error while fetching the organisation", { status: 500 });
    }
}


