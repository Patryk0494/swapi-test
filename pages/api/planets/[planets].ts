import type { NextApiRequest, NextApiResponse } from "next";
import { Planets } from "../../../model/Planets";

const API_URL = "https://swapi.dev/api/";

export default function FetchPlanets(
  req: NextApiRequest,
  res: NextApiResponse<Planets>
) {
  const {
    query: { page },
    method,
  } = req;
}
