import React ,{ useState} from "react";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";

const page = () => {
  return (
    <div className="text-white hidden lg:flex flex-col gap-3 lg:pl-80 h-[100vh] text-center justify-center items-center">
      <HiChatBubbleLeftEllipsis size={70} className="text-gray-400" />
      <h1 className="font-bold">Select a user to start a conversation with.</h1>
      <button className="rounded-[12px] p-2 px-4 text-[12px] cursor-pointer hover:opacity-50 text-white bg-[#6b81fd]">
        Create Group
      </button>
    </div>
  );
};

export default page;
