import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.log(error)
  }
};

export default getUserById;
