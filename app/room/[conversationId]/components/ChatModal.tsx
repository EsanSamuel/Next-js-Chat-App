"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType, FullMessageType } from "@/types";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { format, formatDistanceToNowStrict } from "date-fns";
import GalleryBox from "./GalleryBox";

interface ChatModalProps {
  conversation: FullConversationType | any;
  onClose: () => void;
  messages: FullMessageType[] | any[];
}

const ChatModal: React.FC<ChatModalProps> = ({
  conversation,
  onClose,
  messages,
}) => {
  const otherUser = useOtherUser(conversation);
  return (
    <div className="h-[100vh] w-[350px] bg-[#131313] shadow-lg right-0 fixed p-5">
      <div className="flex justify-between  text-white">
        <h1 className="text-[15px] font-bold">Chat details</h1>
        <IoClose className="h-6 w-6 cursor-pointer" onClick={onClose} />
      </div>
      <div className="mt-3 flex flex-col gap-2 justify-center items-center">
        <Image
          src={otherUser?.image || "/placeholder.png"}
          height={100}
          width={100}
          className="w-20 h-20 rounded-full"
          alt="Profile picture"
        />
        <h1 className="text-[15px] text-white">
          {otherUser?.name || conversation?.groupName}
        </h1>
        <div>
          <p className="text-gray-400 text-[10px]">{otherUser?.email}</p>
        </div>
        <div>
          <p className="text-gray-400 text-[12px]">
            Joined on {format(new Date(otherUser?.createdAt), "MMM")}{" "}
            {format(new Date(otherUser?.createdAt), "dd")},{" "}
            {format(new Date(conversation.createdAt), "yyyy")}.
          </p>
        </div>
      </div>
      <h1 className="text-[15px] text-white text-start mt-5">Gallery</h1>
      {messages.length > 0 ? (
        <div className=" grid gap-2 grid-cols-3 w-full">
          {messages?.map((message) => (
            <div className="">
              <GalleryBox image={message?.image} key={message.id} />
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-gray-400 text-[12px]">No Gallery yet!</h1>
      )}
    </div>
  );
};

export default ChatModal;
