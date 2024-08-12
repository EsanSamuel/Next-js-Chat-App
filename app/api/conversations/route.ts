import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb";

export async function POST(request: Request) {
  try {
    const { groupName, isMulti, userId, members } = await request.json();
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      isMulti &&
      (!groupName || !members || members.length < 2 || !groupName)
    ) {
      return new NextResponse("Can't create group conversation", {
        status: 500,
      });
    }

    //if multiple members are selected, create a group conversation
    if (isMulti) {
      const newConversationRoom = await prisma?.conversation.create({
        data: {
          groupName,
          isMulti,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversationRoom);
    }

    const existingConversationRoom = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversationRoom[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    //create a room between two users
    const newConversationRoom = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversationRoom);
  } catch (error) {
    console.log("ERROR_CREATING_CONVERSATION_ROOM:", error);
    return new NextResponse("Internale server error", { status: 500 });
  }
}

export const GET = async (request: Request) => {
  try {
    try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        return [];
      }
      const conversations = await prisma?.conversation.findMany({
        orderBy: {
          lastMessageAt: "desc",
        },
        where: {
          userIds: {
            has: currentUser.id,
          },
        },
        include: {
          users: true,
        },
      });
      console.log("Conversations fetched:", conversations);
      return NextResponse.json(conversations);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internale server error", { status: 500 });
  }
};
