"use client";
import Avatar from "@/app/components/Avatar";
import { FullConversationType, FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

interface MessageProps {
  message: FullMessageType | any;
  conversation: FullConversationType | any;
}

const MessageChatBox: React.FC<MessageProps> = ({ message, conversation }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const isYourChat = userEmail === message?.sender?.email;
  const handleDelete = () => {
    axios
      .delete(`/api/messages/${message.id}`)
      .then(() => toast.success("Message deleted!"));
  };

  return (
    <div className="flex flex-col gap-1">
      <div onClick={() => setDeleteModal(true)}>
        <div
          className={`flex gap-2 p-2 cursor-pointer ${
            isYourChat && "justify-end"
          }`}
        >
          {/*<div className={`flex gap-2 ${isYourChat && "flex-row-reverse"}`}>
        <Avatar user={message.sender} />
      </div>*/}
          <div className="flex flex-col gap-1">
            {conversation.isMulti && (
              <div className="flex gap-1 items-center">
                <Image
                  src={message.sender.image || "/placeholder.png"}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-5 h-5 rounded-full"
                />
                <h1 className="text-[8px] font-light text-white">
                  {message.sender.name}
                </h1>
              </div>
            )}
            {!message?.image ? (
              <div
                className={`${
                  isYourChat
                    ? "bg-[#6b81fd] user-bubble "
                    : " bg-[#4a4f5a] other-bubble"
                }
       p-2 px-4 text-start min-w-[100px] w-auto h-auto flex flex-col lg:max-w-[500px] max-w-[500px]`}
              >
                <h1 className="text-white text-[11px]">{message.text}</h1>
                <p
                  className={`text-[8px] font-light text-white ${
                    isYourChat ? "text-end" : "text-end"
                  }`}
                >
                  {format(new Date(message.createdAt), "p")}
                </p>
              </div>
            ) : (
              <div
                className={`rounded-[17px] p-1 flex-col flex gap-2 ${
                  isYourChat ? "bg-[#6b81fd]" : "bg-[#4a4f5a]"
                }`}
              >
                <Image
                  src={message?.image}
                  width={250}
                  height={250}
                  className="object-cover 
              rounded-[13px] cursor-pointer 
              hover:scale-80 transition translate"
                  alt="Image"
                />
                <p
                  className={`text-[8px] font-light text-white mr-2 ${
                    isYourChat ? "text-end" : "text-end"
                  }`}
                >
                  {format(new Date(message.createdAt), "p")} 
        {format(new Date(conversation.createdAt), "MMM")}{" "}
        {format(new Date(conversation.createdAt), "dd")},{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isYourChat && (
        <div className={`flex gap-2 ${isYourChat && "justify-end"}`}>
          {deleteModal && (
            <div className="flex gap-2">
              <MdDelete
                size={24}
                className="text-gray-400"
                onClick={handleDelete}
              />
              <IoClose
                size={24}
                className="text-gray-400"
                onClick={() => setDeleteModal(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageChatBox;
