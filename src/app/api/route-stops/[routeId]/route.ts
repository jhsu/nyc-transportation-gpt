import axios from "axios";
import { AppContext } from "next/app";

export async function GET(
  req: Request,
  { params }: { params: { routeId: string } }
) {
  const { routeId } = params;
  const response = await axios.get(
    `https://bustime.mta.info/api/where/stops-for-route/${encodeURIComponent(
      routeId
    )}.json`,
    {
      params: {
        key: process.env.MTA_BUS_API_TOKEN,
      },
    }
  );
  return response.data;
}
