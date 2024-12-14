import { TToDo } from "@/app/page";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  // check data authenticity with maybe ZOD

  // get data from front side
  const data = await request.json();
  console.log("data:", data);

    try {
      await prisma.toDo.create({
        data
      })
      revalidatePath("/");
      return NextResponse.json({message:"sccssfull added ...."})
    } catch (error) {
      console.log("error accures in creating to do", error);
    }

  // mutate
}

export async function GET(request: NextRequest) {
  try {
    const todos = await prisma.toDo.findMany();
    return NextResponse.json({ todos });
  } catch (error) {
    console.error("An error occurred while fetching todos:", error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const {id}= await request.json()
    console.log("id to delete:",await request.json())
    await prisma.toDo.delete({
      where:{
        id:parseInt(id)
      }
    })
    return NextResponse.json("deleted ...");
  } catch (error) {
    return NextResponse.json("error");
  }
}


 
