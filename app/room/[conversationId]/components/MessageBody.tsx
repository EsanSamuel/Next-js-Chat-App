"use client";
import { FullConversationType, FullMessageType } from "@/types";
import React from "react";
import MessageChatBox from "./MessageChatBox";
import useOtherUser from "@/app/hooks/useOtherUser";
import { format, formatDistanceToNowStrict } from "date-fns";

interface MessageProps {
  messages: FullMessageType[] | any[];
  conversation: FullConversationType | any;
}

const MessageBody: React.FC<MessageProps> = ({ messages, conversation }) => {
  const otherUser = useOtherUser(conversation);
  return (
    <div className="flex-1 overflow-y-auto lg:px-10">
      <h1 className="text-center  text-gray-400 text-[13px]">
        Started a conversation with {conversation.groupName || otherUser.name}{" "}
        at {format(new Date(conversation.createdAt), "p")} on{" "}
        {format(new Date(conversation.createdAt), "MMM")}{" "}
        {format(new Date(conversation.createdAt), "dd")},{" "}
        {format(new Date(conversation.createdAt), "yyyy")}.
      </h1>
      {messages?.map((message) => (
        <MessageChatBox
          key={message.id}
          message={message}
          conversation={conversation}
        />
      ))}
    </div>
  );
};

export default MessageBody;