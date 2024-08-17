import prisma from "../../../lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { groupImage, isMulti } = await request.json();
    if (isMulti) {
      const updateGroupConversationImage = await prisma.conversation.update({
        where: {
          id: params.id,
        },
        data: {
          groupImage,
        },
      });
      return NextResponse.json(updateGroupConversationImage);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error!", { status: 500 });
  }
};
