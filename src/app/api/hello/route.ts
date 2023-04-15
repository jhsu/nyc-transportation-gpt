import axios from "axios"

export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}

// Cache this value for 5 minutes
export async function getStopsForRoute(route: string = "MTA NYCT_M1") {
  const response = await axios.get(`https://bustime.mta.info/api/where/stops-for-route/${encodeURIComponent(route)}.json`, {
    params: {
      key: process.env.MTA_BUS_API_TOKEN,
      includePolylines: false,
      version: 2,
    }
  })
  return response.data.data
}

export async function getRoutesForAgency(agency="MTA NYCT") {
    const response = await axios.get(`http://bustime.mta.info/api/where/routes-for-agency/${encodeURIComponent(agency)}.json`, {
      params: {
        key: process.env.MTA_BUS_API_TOKEN,
      }
    })
    return response.data
}