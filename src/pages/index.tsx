import { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import Input from "./input";
export type DataProps = {
  _id: string;
  company_name: string;
  job_title: string;
  salary: number;
  location: string;
  description: string;
  reply: boolean;
  interview: boolean;
}[];

export default function Home() {
  const [update, setUpdate] = useState<boolean>(false);
  const [allData, setAllData] = useState<DataProps>([
    {
      _id: "",
      company_name: "",
      job_title: "",
      salary: 0,
      location: "",
      description: "",
      reply: false,
      interview: false,
    },
  ]);

  async function getJobs() {
    const allDbData = await fetch("/api/jobs/get").then((res) => res.json());
    setAllData(allDbData.jobs);
  }

  useEffect(() => {
    getJobs();
  }, [update]);
  return (
    <div className="flex flex-col m-0 py-5 px-5 bg-green-950 justify-center items-center">
      <Input setUpdate={setUpdate} />
      <Dashboard update={update} setUpdate={setUpdate} allData={allData} />
    </div>
  );
}
