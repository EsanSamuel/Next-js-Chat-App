import getConversationById from "@/app/actions/getConversationsById";
import React from "react";
import Header from "./components/Header";
import MessageBody from "./components/MessageBody";
import Form from "./components/Form";
import getAllMessages from "@/app/actions/getAllMessages";

interface Params {
  conversationId: string;
}

const Room = async ({ params }: { params: Params }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getAllMessages(params.conversationId);
  return (
    <div className="h-[100vh] lg:pl-80 flex flex-col">
      <Header conversation={conversation} messages={messages!}/>
      <MessageBody messages={messages!} conversation={conversation} />
      <Form conversationId={params.conversationId} />
    </div>
  );
};

export default Room;
