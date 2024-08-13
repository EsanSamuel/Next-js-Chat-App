import bcrypt from "bcryptjs";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createUser = await prisma?.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(createUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}
