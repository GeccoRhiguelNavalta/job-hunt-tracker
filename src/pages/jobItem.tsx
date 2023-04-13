import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ItemProps } from "./dashboard";
import { FaTrash, FaEdit, FaBackspace } from "react-icons/fa";
type JobItemProps = {
  item: ItemProps;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
};

export default function JobItem({ item, setUpdate }: JobItemProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [newFormValues, setNewFormValues] = useState(item);

  async function Update() {
    await fetch("/api/jobs/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormValues),
    });
    setUpdate(true);
  }

  function handleChange(
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    event.preventDefault();
    setNewFormValues({
      ...newFormValues,
      [event.target.name]: event.target.value,
    });
  }

  async function deleteOnClick(id: string) {
    await fetch("/api/jobs/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(`${id}`),
    });
    setUpdate(true);
  }

  function bg(item: ItemProps) {
    if (item && item.reply === true && item.interview === false) {
      return "bg-red-600";
    } else {
      return "bg-green-600";
    }
  }
  return !edit ? (
    <div
      className={` ${bg(
        item
      )} grid grid-rows-5 w-[250px] md:w-[600px] h-[600px] md:text-lg font-medium text-center items-center justify-center p-5 gap-2 mb-5 rounded-md shadow-lg`}
    >
      <div>
        Company: <p className="font-light">{item?.company_name}</p>
      </div>
      <div>
        Title: <p className="font-light">{item?.job_title}</p>
      </div>
      <div>
        Salary: <p className="font-light">£ {item?.salary}</p>
      </div>
      <div>
        Location: <p className="font-light">{item?.location}</p>
      </div>
      <div>
        Description: <p className="font-light">{item?.description}</p>
      </div>
      <div>
        Reply: <p className="font-light">{String(item?.reply)}</p>
      </div>
      <div>
        Interview: <p className="font-light">{String(item?.interview)}</p>
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <FaTrash onClick={() => deleteOnClick(item?._id)} />
        <FaEdit onClick={() => (!edit ? setEdit(true) : setEdit(false))} />
      </div>
    </div>
  ) : (
    <div className="bg-green-600 flex flex-col w-[350px] h-[800px] justify-center items-center rounded-md text-sm font-light text-slate-100 md:w-[800px] md:h-[700px] md:text-base md:font-normal py-5">
      <form
        className="grid grid-row-1 justify-center items-center gap-3 w-[300px] md:grid-cols-1 "
        onSubmit={Update}
      >
        <label htmlFor="company_name">Company Name:</label>
        <input
          className="truncate hover:text-clip text-black"
          placeholder={item?.company_name}
          type="text"
          name="company_name"
          id="company_name"
          onChange={handleChange}
        />
        <label htmlFor="job_title">Job Title:</label>
        <input
          className="truncate hover:text-clip text-black"
          placeholder={item?.job_title}
          type="text"
          name="job_title"
          id="job_title"
          onChange={handleChange}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          placeholder={String(item?.salary)}
          type="text"
          name="salary"
          id="salary"
          onChange={handleChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          className="truncate hover:text-clip text-black"
          placeholder={item?.location}
          type="text"
          name="location"
          id="location"
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          className="truncate hover:text-clip text-black"
          placeholder={item?.description}
          name="description"
          id="description"
          onChange={handleChange}
        />
        <label htmlFor="reply">Reply</label>
        <select
          name="reply"
          id="reply"
          onChange={handleChange}
          className="truncate hover:text-clip text-black"
        >
          <option id="reply" value="true">
            True
          </option>
          <option id="reply" value="false">
            False
          </option>
        </select>
        <label htmlFor="interview">Interview:</label>
        <select
          name="interview"
          id="interview"
          onChange={handleChange}
          className="truncate hover:text-clip text-black"
        >
          <option id="interview" value="true">
            True
          </option>
          <option id="interview" value="false">
            False
          </option>
        </select>
        <button
          className=" bg-gradient-to-r from-green-700 via-green-800 to-green-900 
          hover:bg-gradient-to-br focus:ring-4 focus:outline-none
        focus:ring-green-500 dark:focus:ring-green-900 
          rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
          type="submit"
        >
          Update
        </button>
        <div className="flex flex-row justify-center items-center">
          <FaBackspace
            className="w-[35px] h-[35px] text-red-700"
            onClick={() => (!edit ? setEdit(true) : setEdit(false))}
          />
        </div>
      </form>
    </div>
  );
}
