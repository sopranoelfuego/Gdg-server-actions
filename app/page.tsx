import Link from "next/link";
import { formAction } from "./actions/formAction";
import { useState } from "react";
import { number } from "zod";
import { PrismaClient, ToDo } from "@prisma/client";
import ListOfToDos from "./components/ListOfToDos";

export type TToDo = {
  id?: number | string;
  title: string;
  description: string;
  published: boolean
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
const prisma=new PrismaClient()
// const fetchToDos = async () => {
//   try {
//     const response = await fetch(
//       "https://656f2b6d6529ec1c62377a9a.mockapi.io/api/todos"
//     );
//     // const response:Array<TToDo>=await prisma.toDo.findMany()
    

//     return response;
//   } catch (error) {
//     console.log("error accures", error);
//   }
// };
const fetchToDos = async (): Promise<Array<TToDo> | void> => {
  try {
    const response = await prisma.toDo.findMany();
    return response as Array<TToDo>;
  } catch (error) {
    console.error("An error occurred while fetching todos:", error);
  }
};

export default async function Home() {
  // const todos =[]  as Array<TToDo>
  const todos = await fetchToDos();
  // SERVER ACTIONS INLINE WAY
  // const formAction=async(formdata:FormData)=>{
  //   "use server"
  //   const title=formdata.get("title")
  //  console.log("data here:",title)
  // }
  return (
    <div className="min-w-full text-center gap-10 flex items-center flex-col h-screen ">

<h1 className="font-semibold text-2xl mb-5 mt-5">Server actions way</h1>

      {/*  ===================== Main container =============== */}
      <div className="mx-auto  max-w-4xl flex items-start gap-8 min-w-0 sm:min-w-96  w-full p-2 sm:p-5">
        {/* FORM */}

        <div className="flex-1 ">
          <div>
            {/* BEFORE WE USE TO USE ACTION PROPERTY AND PASS A URL BUT NOW WE PASS A */}
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
                className="bg-cyan-600 text-white rounded-lg p-2 text-lg font-semibold"
              />
            </form>
          </div>
        </div>

        {/* END OF FORM */}
        {/* LIST OF TODOS */}
      <ListOfToDos todos={todos as Array<TToDo>}/>
      </div>
    </div>
  );
}
