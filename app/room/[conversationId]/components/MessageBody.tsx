"use client";
import { FullConversationType, FullMessageType } from "@/types";
import React, { useRef, useEffect, useState } from "react";
import MessageChatBox from "./MessageChatBox";
import useOtherUser from "@/app/hooks/useOtherUser";
import { format, formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { pusherClient } from "@/app/lib/pusher";
import { find } from "lodash";

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
  const [allMessages, setAllMessages] = useState(messages);
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen_message`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen_message`);

      setAllMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    pusherClient.bind("messages:new", () => messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [bottomRef, conversationId]);

  return (
    <div className="flex-1 overflow-y-auto lg:px-10">
      <h1 className="text-center  text-gray-400 text-[13px] lg:p-2 p-5">
        Started a conversation with {conversation.groupName || otherUser.name}{" "}
        at {format(new Date(conversation.createdAt), "p")} on{" "}
        {format(new Date(conversation.createdAt), "MMM")}{" "}
        {format(new Date(conversation.createdAt), "dd")},{" "}
        {format(new Date(conversation.createdAt), "yyyy")}.
      </h1>
      {allMessages?.map((message) => (
        <MessageChatBox
          key={message.id}
          message={message}
          conversation={conversation}
        />
      ))}
      <div className="pt-10" ref={bottomRef} />
    </div>
  );
};

export default MessageBody;
