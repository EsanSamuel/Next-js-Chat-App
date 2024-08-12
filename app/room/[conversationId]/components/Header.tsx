"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import React, { useMemo } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

interface HeaderProps {
  conversation: FullConversationType | any;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const status = useMemo(() => {
    if (conversation.isMulti) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);
  return (
    <div className="flex w-full justify-between p-5 ">
      <div className="flex gap-3 items-center">
        <Link href="/room">
          <IoIosArrowBack size={24} className="text-gray-400" />
        </Link>
        <Avatar user={otherUser!} />
        <div>
          <h1 className="text-white font-bold">
            {conversation.groupName || otherUser?.name}
          </h1>
          <p className="font-light text-gray-400 text-[12px]">{status}</p>
        </div>
      </div>
      <HiEllipsisHorizontal size={24} className="text-white" />
    </div>
  );
};

export default Header;
