"use client";
import { FullConversationType, FullMessageType } from "@/types";
import React, { useRef, useEffect } from "react";
import MessageChatBox from "./MessageChatBox";
import useOtherUser from "@/app/hooks/useOtherUser";
import { format, formatDistanceToNowStrict } from "date-fns";
import axios from "axios";

interface MessageProps {
  messages: FullMessageType[] | any[];
  conversation: FullConversationType | any;
  conversationId: string;
}

const MessageBody: React.FC<MessageProps> = ({
  messages,
  conversation,
  conversationId,
}) => {
  const otherUser = useOtherUser(conversation);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen_message`);
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [bottomRef]);

  return (
    <div className="flex-1 overflow-y-auto lg:px-10">
      <h1 className="text-center  text-gray-400 text-[13px] lg:p-2 p-5">
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
      <div className="" ref={bottomRef} />
    </div>
  );
};

export default MessageBody;
