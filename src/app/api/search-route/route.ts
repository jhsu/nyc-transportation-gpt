import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Extract query parameters from the client request
    const { searchParams } = new URL(req.url);
    const description = searchParams.get("description");
    const agency = "MTA NYCT";

    // Validate input
    if (!agency || !description) {
      return NextResponse.json({
        error: "Both agency and description are required.",
      });
    }

    // Construct the URL for the MTA API request
    const url = `http://bustime.mta.info/api/where/routes-for-agency/${encodeURIComponent(
      agency
    )}.json`;

    // Make a request to the MTA API
    const response = await axios.get(url, {
      params: {
        key: process.env.MTA_BUS_API_TOKEN,
      },
    });

    // Filter the routes based on the description
    const matchingRoutes = response.data.data.list.filter(
      (route: { description: string }) =>
        route.description
          .toLowerCase()
          .includes(((description as string) ?? "").toLowerCase())
    );

    // Extract the route IDs from the matching routes
    const routeIds = matchingRoutes.map((route: { id: string }) => route.id);

    // Return the route IDs in the response
    return NextResponse.json({ routeIds });
  } catch (error: any) {
    // Handle errors and send an error response to the client
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
