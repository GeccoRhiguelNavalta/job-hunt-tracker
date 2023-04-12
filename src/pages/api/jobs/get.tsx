import connectMongo from "@/utils/connectMongo";
import Jobs from "@/utils/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getJobs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const jobs = await Jobs.find();
    res.json({ jobs });
  } catch (error) {
    res.json({ error });
  }
}
