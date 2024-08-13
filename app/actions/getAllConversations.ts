import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getAllConversations = async () => {
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
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });
    console.log("Conversations fetched:", conversations);
    return conversations;
  } catch (error) {
    console.log(error);
  }
};

export default getAllConversations;
