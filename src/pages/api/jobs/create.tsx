import connectMongo from "@/utils/connectMongo";
import Jobs from "@/utils/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const thisJob = await Jobs.create(req.body);
    res.json({ thisJob });
  } catch (error) {
    res.json({ error });
  }
}
