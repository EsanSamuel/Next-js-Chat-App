import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";

interface Params {
  id: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteMessage = await prisma?.message.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deleteMessage);
  } catch (error) {
    console.log(error);
  }
};
