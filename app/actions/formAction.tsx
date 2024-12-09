"use server";

import { revalidatePath } from "next/cache";
import { TToDo } from "../page";

export async function formAction(formdata: FormData) {
  const bodyToSent = {
    title: formdata.get("title"),
    description: formdata.get("description"),
  };
  try {
    const response = await fetch(
      "https://656f2b6d6529ec1c62377a9a.mockapi.io/api/todos",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bodyToSent),
      }
    );
    if (!response.ok) throw new Error("Error in fetching toDos");
    revalidatePath("/");
  } catch (error) {
    console.log("error accures in creating to do", error);
  }
}

export async function formActionOfUstate(previousState:TToDo,formdata: FormData) {
    const bodyToSent = {
      title: formdata.get("title"),
      description: formdata.get("description"),
    };
    try {
      const response = await fetch(
        "https://656f2b6d6529ec1c62377a9a.mockapi.io/api/todos",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(bodyToSent),
        }
      );
      if (!response.ok) throw new Error("Error in fetching toDos");
      revalidatePath("/");
    } catch (error) {
      console.log("error accures in creating to do", error);
    }
  }
  