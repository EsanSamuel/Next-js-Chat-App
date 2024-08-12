import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";

interface Params {
  id: string;
}

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    const { name, image, bio } = await request.json();

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
   
    const updateUser = await prisma?.user.update({
      data: {
        name,
        bio,
        image
      },
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
