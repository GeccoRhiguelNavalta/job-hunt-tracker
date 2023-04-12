import connectMongo from "@/utils/connectMongo";
import Jobs from "@/utils/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    await Jobs.deleteOne({ _id: req.body });
    res.json({ message: "Job Deleted" });
  } catch (error) {
    res.json({ error });
  }
}
