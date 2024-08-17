import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb";

interface Params {
  id: string;
}

export const POST = async (
  request: Request,
  { params }: { params: Params }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const conversationId = params.id;

  //find the conversation through the params and filter the last message
  const conversation = await prisma?.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      users: true,
      messages: {
        include: {
          seen: true,
          sender: true,
        },
      },
    },
  });

  if (!conversation) {
    return new NextResponse("Conversation not found!", { status: 404 });
  }
//filter last message
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  if (!lastMessage) {
    return NextResponse.json(conversation);
  }

  //update the seen in the last message id
  const seenMessage = await prisma.message.update({
    where: {
      id: lastMessage.id,
    },
    data: {
      seen: {
        connect: {
          id: currentUser.id,
        },
      },
    },
    include: {
      seen: true,
      sender: true,
    },
  });

  return NextResponse.json(seenMessage)
};
