import Link from "next/link";
import { formAction } from "./actions/formAction";
import { useState } from "react";
import { number } from "zod";

export type TToDo = {
  id?: number | string;
  title: string;
  description: string;
};

// DATA OF MENUS TO DISPLAYS

const menus: Array<{ id: number; name: string; path: string }> = [
  {
    id: 1,
    name: "Traditional Form Submission",
    path: "/",
  },
  {
    id: 2,
    name: "Server actions in server components",
    path: "/client-side-way",
  },
  {
    id: 3,
    name: "Server actions in client components",
    path: "/client-side-way",
  },
  {
    id: 4,
    name: "Server actions in client components",
    path: "/",
  },
];
const fetchToDos = async () => {
  try {
    const response = await fetch(
      "https://656f2b6d6529ec1c62377a9a.mockapi.io/api/todos"
    );
    if (!response.ok) throw new Error("Error in fetching toDos");

    return response.json();
  } catch (error) {
    console.log("error accures", error);
  }
};
export default async function Home() {
  const todos: Array<TToDo> = await fetchToDos();
  // INLINE WAY
  // const formAction=async(formdata:FormData)=>{
  //   "use server"
  //   const title=formdata.get("title")
  //  console.log("data here:",title)
  // }
  return (
    <div className="min-w-full flex items-center flex-col h-screen ">
      {/* BUTTONS WHICH HEAD TO DIFFERENT PAGES */}
      <ul className="flex items-center gap-3 py-5">
        {menus?.map((_) => (
          <li
            key={_?.id}
            className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200"
          >
            <Link href={_?.path}>{_.name}</Link>
          </li>
        ))}
      </ul>
      <div></div>
      {/*  ===================== Main container =============== */}
      <div className="mx-auto  max-w-6xl flex items-start gap-5 min-w-0 sm:min-w-96  w-full p-2 sm:p-5">
        {/* FORM */}

        <div className="flex-1 ">
          <h1 className="font-semibold text-2xl mb-5">Create a ToDo</h1>
          <div>
            <form className="flex flex-col gap-4" action={formAction}>
              <input
                name="title"
                type="text"
                aria-label="Title"
                placeholder="title"
                className="border-2 w-full outline-none rounded-lg p-2 border-gray-300"
              />
              <input
                name="description"
                type="text"
                placeholder="description"
                className="border-2 w-full outline-none rounded-lg p-2 border-gray-300"
              />
              <input
                type="Submit"
                value="submit"
                className="bg-blue-400 text-white rounded-lg p-2 text-lg font-semibold"
              />
            </form>
          </div>
        </div>

        {/* END OF FORM */}
        {/* LIST OF TODOS */}
        <div className="flex-1">
          <h1 className="font-semibold text-2xl mb-5">List of toDos</h1>
          <ol className="w-full">
            {todos?.length
              ? todos?.map((_: TToDo) => (
                  <li key={_?.id}>
                    <p className="font-[550]">{_.title}</p>
                    <p>{_.description}</p>
                  </li>
                ))
              : "Wallahi no data yet ..!!"}
          </ol>
        </div>
      </div>
    </div>
  );
}
