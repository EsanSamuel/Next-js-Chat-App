import getSession from "./getSession";
import prisma from "../lib/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      console.log("No session found!");
      return null;
    }

    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        conversations: true,
      },
    });

    console.log("CurrentUser:", currentUser);
    return currentUser;
  } catch (error) {
    console.log(error);
  }
};

export default getCurrentUser;
