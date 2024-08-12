import getCurrentUser from "./getCurrentUser";
import prisma from "../lib/prismadb";

const getUsers = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      console.log("Not logged in");
    }

    const users = await prisma?.user.findMany({
      where: {
        NOT: {
          email: currentUser?.email,
        },
      },
    });

    return users;
  } catch (error) {
    console.log(error);
  }
};

export default getUsers;
