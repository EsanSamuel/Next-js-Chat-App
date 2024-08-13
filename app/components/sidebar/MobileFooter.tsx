"use client";
import React, { useState } from "react";
import { IoClose, IoLogoSnapchat } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { IoSettings } from "react-icons/io5";
import Setting from "../Setting";
import { usePathname } from "next/navigation";

interface MobileProps {
  user: User;
}

const MobileFooter: React.FC<MobileProps> = ({ user }) => {
  const [settingModal, setSettingModal] = useState(false);
  const pathname = usePathname();
  if (pathname === "/room/[conversationId]") {
    return null;
  }
  return (
    <>
      {settingModal && (
        <Setting
          isOpen={settingModal}
          onClose={() => setSettingModal(false)}
          user={user}
        />
      )}
      <div className="fixed flex justify-between z-40 items-center bg-[#2e333d]  bottom-0 p-3 w-full lg:hidden ">
        <div className="flex justify-between w-full">
          <ul className="flex justify-between cursor-pointer font-light w-full text-gray-400">
            <Link href="/users">
              <li className="flex flex-col justify-center items-center">
                <FaUsers size={24} className="hover:opacity-50" />
                <p className="text-[9px]">All users</p>
              </li>
            </Link>
            <Link href="/room">
              <li className="flex flex-col justify-center items-center">
                <HiMiniChatBubbleLeftRight
                  size={24}
                  className="hover:opacity-50"
                />
                <p className="text-[9px]">All chats</p>
              </li>
            </Link>
            <li className="flex flex-col justify-center items-center">
              <IoLogOut
                size={24}
                className="hover:opacity-50"
                onClick={() => signOut()}
              />
              <p className="text-[9px]">Logout</p>
            </li>

            <li
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => setSettingModal(true)}
            >
              <IoSettings size={24} className="hover:opacity-50" />
              <p className="text-[9px]">Settings</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
