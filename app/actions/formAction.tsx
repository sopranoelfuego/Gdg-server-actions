"use server";

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';


const prisma = new PrismaClient()

export async function formAction(formdata: FormData) {
  const bodyToSent = {
    title: formdata.get("title") as string,
    description: formdata.get("description") as string,
  };
 
  try {
    await prisma.toDo.create({
      data:{
        description:bodyToSent.description,
        title:bodyToSent.title,
      }
    })
    console.log("added")
    revalidatePath("/");
  } catch (error) {
    console.log("error accures in creating to do", error);
  }
}

export async function deleteAction(formdata: FormData){
 
 const id= formdata.get("todo") as string
  try {
    await prisma.toDo.delete({
      where:{
        id:parseInt(id)
      }
    })
    revalidatePath("/");
  } catch (error) {
    console.log("error accures in creating to do", error);
  }
}