import React from "react";
import { TToDo } from "../page";
import { deleteAction } from "../actions/formAction";

export type LPropos = {
  todos: Array<TToDo>;
};
function ListOfToDos({ todos }: LPropos) {
  return (
    <div className="flex-1">
      <ol className="w-full">
        {todos?.length
          ? todos?.map((_: TToDo) => (
              <li key={_?.id} className="my-3 text-left bg-gray-50 px-3 py-2 rounded-lg">
                <form action={deleteAction} className="flex items-start justify-between">
                  <input name="todo" className="hidden" value={_?.id} />
                  <div>
                    <p className="text-sm font-semibold">{_.title}</p>
                    <p className="text-sm">{_.description}</p>
                  </div>

                  <button
                    type="submit"
                    className="py-1 px-2 text-white text-sm bg-red-400 rounded-lg"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))
          : "Wallahi no data yet ..!!"}
      </ol>
    </div>
  );
}

export default ListOfToDos;
