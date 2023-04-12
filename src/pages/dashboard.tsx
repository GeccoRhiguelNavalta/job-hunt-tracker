import { Dispatch, SetStateAction } from "react";
import { DataProps } from ".";
import JobItem from "./jobItem";

type DashboardProps = {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  allData: DataProps;
};

export type ItemProps = {
  _id: string;
  company_name: string;
  job_title: string;
  salary: number;
  location: string;
  description: string;
  reply: boolean;
  interview: boolean;
};

export default function Dashboard({
  update,
  setUpdate,
  allData,
}: DashboardProps) {
  return (
    <div className="bg-green-800 flex flex-col w-[350px] h-[1000px] justify-start items-center rounded-md text-sm font-light text-slate-100 md:w-[1000px] md:h-[700px] overflow-y-scroll pb-10 pt-10">
      <h1 className="text-lg font-medium md:text-2xl md:font-semibold mb-10 mt-10">
        JOB LIST
      </h1>
      {!allData ? (
        <div>Loading..</div>
      ) : (
        allData.map((item: ItemProps) => {
          return (
            <JobItem
              key={item._id}
              item={item}
              setUpdate={setUpdate}
              update={update}
            />
          );
        })
      )}
    </div>
  );
}
