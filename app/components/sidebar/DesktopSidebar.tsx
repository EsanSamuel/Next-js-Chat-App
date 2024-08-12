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

interface DesktopSidebarProps {
  user: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ user }) => {
  console.log(user);
  const [settingModal, setSettingModal] = useState(false);
  return (
    <>
      {settingModal && (
        <Setting
          isOpen={settingModal}
          onClose={() => setSettingModal(false)}
          user={user}
        />
      )}
      <div className="p-5 text-gray-400  hidden lg:fixed left-0 overflow-y-auto lg:z-40 inset-y-0 lg:flex lg:flex-col items-center">
        <h1>
          <IoLogoSnapchat size={24} />
        </h1>

        <div className="mt-10 flex flex-col gap-3 space-y-5">
          <ul className="flex flex-col gap-5 cursor-pointer font-light">
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
          </ul>
        </div>

        <nav className="mt-2 flex fixed gap-5 bottom-3 flex-col justify-center items-center">
          <ul className="flex flex-col gap-5">
            <li
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => setSettingModal(true)}
            >
              <IoSettings size={24} className="hover:opacity-50" />
              <p className="text-[9px]">Settings</p>
            </li>
            <div className="cursor-pointer mb-2">
              <Avatar user={user!} />
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
