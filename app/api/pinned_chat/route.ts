import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb"

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = await request.json();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const pinnChat = await prisma?.pinned.create({
      data: {
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        user: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
    });
    console.log(pinnChat)
    return NextResponse.json(pinnChat);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error!", { status: 500 });
  }
};
