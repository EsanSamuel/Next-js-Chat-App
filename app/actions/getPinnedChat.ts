import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getPinnedChat = async () => {
  try {
    const currentUser = await getCurrentUser();

    const pinnedChat = await prisma.pinned.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: {
        conversation: {
          include: {
            users: true,
            messages: {
              include: {
                seen: true,
                sender: true,
              },
            },
          },
        },
      },
    });

    console.log(pinnedChat)
    return pinnedChat;
  } catch (error) {
    console.log(error);
  }
};

export default getPinnedChat;
