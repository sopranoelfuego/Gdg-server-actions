"use client"
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { number } from "zod";
import { formAction, formActionOfUstate } from "../actions/formAction";

export type TToDo = {
  id?:number | string,
  title: string;
  description: string;
};

const fetchToDos=async ()=>{
  try {
    const response=await fetch("https://656f2b6d6529ec1c62377a9a.mockapi.io/api/todos")
    if(!response.ok)
      throw new Error('Error in fetching toDos');
    
    return response.json()
  } catch (error) {
    console.log("error accures",error)
  }
}
export default async function Home() {
//   const todos:Array<TToDo>=await fetchToDos()
const [todos, setTodos] = useState([] as Array<TToDo>)
// const [message,newFormAction,isPending]=useActionState(formActionOfUstate,null)
  useEffect(() => {
    let unsubscrib=true
    const init=async ()=>{
        try {
          const response=await fetch("https://656f2b6d6529ec1c62377a9a.mockapi.io/api/todos")
          if(!response.ok)
            throw new Error('Error in fetching toDos');
        const data=await response.json()
          setTodos(data)
        } catch (error) {
          console.log("error accures",error)
        }
      }
      init()
    return () => {
      unsubscrib=false
    }
  }, [])
  
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
        <li className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200">
          <Link href="/">Traditional Form Submission</Link>
        </li>
        <li className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200">
          <Link href="client-side-way">
            Server actions - <span className="font-bold">Server side</span>{" "}
          </Link>
        </li>
        <li className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200">
          Server actions - <span className="font-bold">Client side</span>
        </li>
        <li className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200">
          Using a Third-Party Library(formik)
        </li>
      </ul>
      <div>
      </div>
      {/*  ===================== Main container =============== */}
      <div className="mx-auto  max-w-6xl flex items-start gap-5 min-w-0 sm:min-w-96  w-full p-2 sm:p-5">
        {/* FORM */}

        <div className="flex-1 ">
          <h1 className="font-semibold text-2xl mb-5">Create a ToDo in client component</h1>
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
            {todos?.map((_:TToDo)=>(<li key={_?.id}>
              
              <p className="font-[550]">{_.title}</p>
              <p>{_.description}</p>

            </li>))}
          </ol>
        </div>
      </div>
    </div>
  );
}
