import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getAllMessages = async (conversationId: string) => {
  const currentUser = await getCurrentUser();
  try {
    if (!currentUser) {
      return [];
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    return messages;
  } catch (error) {
    console.log(error);
  }
};

export default getAllMessages;
