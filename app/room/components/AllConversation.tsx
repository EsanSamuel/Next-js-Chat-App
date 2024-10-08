"use client";
import { Conversation, Pinned, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/types";
import axios from "axios";
import { MdOutlineGroupAdd } from "react-icons/md";
import CreateGroupModal from "./CreateGroupModal";
import { usePathname } from "next/navigation";

interface ConversationProps {
  conversations: FullConversationType[] | any[];
  users: User[];
  pinned: Pinned[] | any[];
}

const AllConversation: React.FC<ConversationProps> = ({
  conversations,
  users,
  pinned,
}) => {
  const [items, setItems] = useState(conversations);
  const [searchUsers, setSearchUsers] = useState("");
  const [groupModal, setGroupModal] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {groupModal && (
        <CreateGroupModal
          users={users}
          onClose={() => setGroupModal(false)}
          isOpen={groupModal}
        />
      )}
      <div
        className={`fixed bg-[#2e333d] lg:w-80 w-full overflow-y-auto lg:left-20 lg:block lg:px-10 lg:py-5 p-2 pb-20
       h-full lg:rounded-l-[20px] ${
         pathname === "/room" ? "block" : "hidden"
       }`}
      >
        <div className="flex justify-between">
          <h1 className="font-bold pb-2 text-[15px] text-white">Chats</h1>
          <MdOutlineGroupAdd
            size={24}
            className="text-gray-400 cursor-pointer"
            onClick={() => setGroupModal(true)}
          />
        </div>
        <input
          className="w-full py-3 px-3 bg-[#4a4f5a] rounded-[10px] text-[12px]
      text-gray-400 outline-none"
          placeholder="Search users"
          onChange={(e) => setSearchUsers(e.target.value)}
        />

        <div>
          {pinned?.length > 0 && (
            <div className="mt-5">
              <h1 className="text-white font-bold pb-2 text-[15px]">
                Pinned Chats
              </h1>
              {pinned?.map((user) => (
                <div className="flex flex-col gap-3"  key={user.id}>
                  <ConversationBox
                    data={user?.conversation!}
                    isPinned
                    pinn={user}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5">
          <h1 className="text-white font-bold pb-2 text-[15px]">All Chats</h1>
          {items
            ?.filter((conversation) => {
              if (searchUsers === "") {
                return conversation;
              } else if (
                conversation?.users?.name
                  ?.toLowerCase()
                  .includes(searchUsers.toLocaleLowerCase())
              ) {
                return conversation;
              }
            })
            .map((conversation) => (
              <div className="flex flex-col gap-4" key={conversation.id}>
                <ConversationBox  data={conversation} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllConversation;
