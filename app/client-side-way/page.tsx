"use client";
import { useEffect, useState } from "react";
import ListOfToDos from "../components/ListOfToDos";
import { TToDo } from "../page";
import ListOfToDosForClients from "../components/ListOfToDosForClients";

export default function Home() {
  //   const todos:Array<TToDo>=await fetchToDos()
  const [todos, setTodos] = useState([] as Array<TToDo>);
  const [newTodo, setNewTodo] = useState({} as TToDo);
  const [reload, setReload] = useState(false);
  // const [message,newFormAction,isPending]=useActionState(formActionOfUstate,null)
  useEffect(() => {
    let unsubscrib = true;
    const init = async () => {
      try {
        const response = await fetch("/api/todo");
        if (!response.ok) throw new Error("Error in fetching toDos");
        const { todos } = await response.json();
        if (unsubscrib) setTodos(todos as Array<TToDo>);
      } catch (error) {
        console.log("error accures", error);
      }
    };
    init();
    return () => {
      unsubscrib = false;
    };
  }, [reload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTodo((_) => ({ ..._, [e?.target.name]: e?.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json",
        },
      });
      setReload(_=>!_)

    } catch (error) {
      console.log("error in creating todo");
    }
  };
  const handleDelete= async(id:number)=>{
    try {
      await fetch("/api/todo", {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-type": "application/json",
        },
      });
      setReload(_=>!_)
    } catch (error) {
      console.log("error in creating todo");
    }
  }
  return (
    <div className="min-w-full flex items-center text-center gap-10 flex-col h-screen ">
      <h1 className="font-semibold text-2xl mb-5 mt-5">Classic way component</h1>
      {/*  ===================== Main container =============== */}
      <div className="mx-auto  max-w-4xl flex items-start gap-8 min-w-0 sm:min-w-96  w-full p-2 sm:p-5">
        {/* FORM */}

        <div className="flex-1 ">
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                type="text"
                aria-label="Title"
                placeholder="title"
                value={newTodo.title}
                onChange={handleChange}
                className="border-2 w-full outline-none rounded-lg p-2 border-gray-300"
              />
              <input
                name="description"
                type="text"
                placeholder="description"
                value={newTodo.description}
                onChange={handleChange}
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
        <ListOfToDosForClients handleClickDelete={handleDelete} todos={todos as Array<TToDo>} />
      </div>
    </div>
  );
}
