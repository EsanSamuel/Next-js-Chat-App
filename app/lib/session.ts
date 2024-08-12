import { AuthOptions, User } from "next-auth";
import prisma from "./prismadb";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  //adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma?.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          console.log("User does not exist!");
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user?.hashedPassword
        );

        if (!isCorrectPassword) {
          console.log("Incorrect password!");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (user) {
        session.user.id = user.id.toString();
      }
      return session;
    },
    async signIn({ user }: { user: User | AdapterUser }) {
      const userExists = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email!,
            image: user.image,
          },
        });
      }
      return true;
    },
  },
};

