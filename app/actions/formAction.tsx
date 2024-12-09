
"use server"

export async function formAction(formdata:FormData){
    const title=formdata.get("title")
    console.log("data here:",title)
}