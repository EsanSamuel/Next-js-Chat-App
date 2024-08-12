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

    const record = await prisma.pinned.findUnique({
      where: { id: params.id },
    });

    if (!record) {
      return new NextResponse("Record not found", { status: 404 });
    }

    const unPinnChat = await prisma.pinned.delete({
      where: {
        id: params.id,
      },
    });
    console.log(unPinnChat);
    return NextResponse.json(unPinnChat);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error!", { status: 500 });
  }
};
