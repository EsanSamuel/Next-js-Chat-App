"use client";
import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user: User;
  notRounded?: boolean;
  isChat?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ user, notRounded, isChat }) => {
  return (
    <div
      className={`relative inset-block overflow-hidden
     w-11 h-11 ${notRounded ? "rounded-[10px]" : "rounded-[10px]"} ${
        isChat && "w-8 h-8 rounded-full"
      }`}
    >
      <Image
        src={user?.image! || "/placeholder.png"}
        className={`${notRounded ? "rounded-[10px]" : "rounded-[10px]"} ${
          isChat && "w-11 h-11 rounded-full"
        }`}
        fill
        quality={100} 
        alt={user?.name!}
      />
    </div>
  );
};

export default Avatar;
