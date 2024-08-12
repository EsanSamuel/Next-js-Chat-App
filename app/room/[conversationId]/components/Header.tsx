"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType, FullMessageType } from "@/types";
import React, { useMemo, useState } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import ChatModal from "./ChatModal";

interface HeaderProps {
  conversation: FullConversationType | any;
  messages: FullMessageType[] | any[];
}

const Header: React.FC<HeaderProps> = ({ conversation, messages }) => {
  const otherUser = useOtherUser(conversation);
  const [openModal, setOpenModal] = useState(false);

  const status = useMemo(() => {
    if (conversation.isMulti) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);
  return (
    <>
      {openModal && (
        <ChatModal
          conversation={conversation}
          onClose={() => setOpenModal(false)}
          messages={messages!}
        />
      )}
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
        <HiEllipsisHorizontal
          size={24}
          className="text-white cursor-pointer"
          onClick={() => setOpenModal(true)}
        />
      </div>
    </>
  );
};

export default Header;
