import { formAction } from "./actions/formAction";

export default function Home() {
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
          Traditional Form Submission
        </li>
        <li className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200">
          Server actions - <span className="font-bold">Server side</span>{" "}
        </li>
        <li className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200">
          Server actions - <span className="font-bold">Client side</span>
        </li>
        <li className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-slate-200">
          Using a Third-Party Library(formik)
        </li>
      </ul>
      {/*  ===================== Main container =============== */}
      <div className="mx-auto max-w-6xl flex items-start gap-5 min-w-0 sm:min-w-96 sm:w-auto w-full p-2 sm:p-5">
        {/* FORM */}

        <div className="flex-1">
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
        </div>
      </div>
    </div>
  );
}
