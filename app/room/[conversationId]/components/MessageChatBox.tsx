"use client";
import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";
import { format } from "date-fns";
import Image from "next/image";

interface MessageProps {
  message: FullMessageType | any;
}

const MessageChatBox: React.FC<MessageProps> = ({ message }) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const isYourChat = userEmail === message.sender.email;

  return (
    <>
      <div>
        <div className={`flex gap-2 p-2 ${isYourChat && "justify-end"}`}>
          {/*<div className={`flex gap-2 ${isYourChat && "flex-row-reverse"}`}>
        <Avatar user={message.sender} />
      </div>*/}
          {!message?.image ? (
            <div
              className={`${
                isYourChat
                  ? "bg-[#6b81fd] user-bubble "
                  : " bg-[#4a4f5a] other-bubble"
              }
       p-2 px-4 text-start min-w-[100px] w-auto h-auto flex flex-col lg:max-w-[500px] max-w-[500px]`}
            >
              <h1 className="text-white text-[13px]">{message.text}</h1>
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
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageChatBox;
