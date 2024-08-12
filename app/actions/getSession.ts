import { getServerSession } from "next-auth";
import  { authOptions } from "../lib/session";

export default async function getSession() {
  return await getServerSession(authOptions);
}
