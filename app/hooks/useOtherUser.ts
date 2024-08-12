import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const { data: session } = useSession();

  const otherUser = useMemo(() => {
    const userEmail = session?.user?.email;

    const otherUser = conversation?.users?.filter(
      (user) => user.email !== userEmail
    );

    console.log(otherUser[0]);
    return otherUser[0];
  }, [session?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
