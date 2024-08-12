import React from "react";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";

const page = () => {
  return (
    <div className="text-white hidden lg:flex flex-col gap-3 lg:pl-80 h-[100vh] text-center justify-center items-center">
      <HiChatBubbleLeftEllipsis size={70} className="text-gray-400" />
      <h1 className="font-bold">Select a user to start a conversation with.</h1>
    </div>
  );
};

export default page;
