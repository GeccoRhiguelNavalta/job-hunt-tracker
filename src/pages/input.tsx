import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
type InputProps = {
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

type FormProps = {
  company_name: string;
  job_title: string;
  salary?: number;
  location?: string;
  description?: string;
  reply: boolean;
  interview: boolean;
};

export default function Input({ setUpdate }: InputProps) {
  const [formValues, setFormValues] = useState<FormProps>({
    company_name: "",
    job_title: "",
    salary: 0,
    location: "",
    description: "",
    reply: false,
    interview: false,
  });

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  async function handleSubmit() {
    await fetch("/api/jobs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    setUpdate(true);
  }
  return (
    <div className="bg-green-600 flex flex-col w-[350px] h-[800px] justify-center items-center rounded-md text-sm font-light text-slate-100 md:w-[1000px] md:h-[700px] mb-10 mt-10">
      <h1 className="text-lg font-medium md:text-2xl md:font-semibold mb-10">
        JOB HUNT TRACKER
      </h1>
      <form
        className="grid grid-row-1 justify-center items-center gap-3 w-[300px] md:grid-cols-1"
        onSubmit={handleSubmit}
      >
        <label htmlFor="company_name">Company Name:</label>
        <input
          className="text-black"
          type="text"
          name="company_name"
          id="company_name"
          onChange={handleChange}
        />
        <label htmlFor="job_title">Job Title:</label>
        <input
          className="text-black"
          type="text"
          name="job_title"
          id="job_title"
          onChange={handleChange}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          className="text-black"
          type="text"
          name="salary"
          id="salary"
          onChange={handleChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          className="text-black"
          type="text"
          name="location"
          id="location"
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          className="text-black"
          name="description"
          id="description"
          onChange={handleChange}
        />
        <label htmlFor="reply">Reply</label>
        <select className="text-black" name="reply" id="reply">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <label htmlFor="interview">Interview:</label>
        <select className="text-black" name="interview" id="interview">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button
          className=" bg-gradient-to-r from-green-700 via-green-800 to-green-900 
          hover:bg-gradient-to-br focus:ring-4 focus:outline-none
           focus:ring-green-500 dark:focus:ring-green-900 
           rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
