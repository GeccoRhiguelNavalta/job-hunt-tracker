import connectMongo from "@/utils/connectMongo";
import Jobs from "@/utils/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function NewUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const filter = req.body.id;
    await Jobs.updateOne(filter, {
      company_name: req.body.company_name,
      job_title: req.body.job_title,
      salary: req.body.salary,
      location: req.body.location,
      description: req.body.description,
      reply: req.body.reply,
      interview: req.body.interview,
    });
    res.json({ message: "updated" });
  } catch (error) {
    res.json({ error });
  }
}
