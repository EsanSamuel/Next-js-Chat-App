"use client";
import getUsers from "@/app/actions/getUsers";
import React, { useState } from "react";
import UserItem from "./UserItem";
import { User } from "@prisma/client";
import Image from "next/image";

interface AllUserProps {
  users: User[];
  currentUser: User;
}

const AllUsers: React.FC<AllUserProps> = ({ users, currentUser }) => {
  const [searchUsers, setSearchUsers] = useState("");
  return (
    <div
      className="fixed bg-[#2e333d] lg:w-80 w-full overflow-y-auto lg:left-20 lg:block lg:px-10 lg:py-5 p-2 h-[100vh]
    lg:first:rounded-l-[20px]"
    >
      <div className="flex justify-between items-center pb-2">
        <h1 className="font-bold text-[15px] text-white">Users</h1>
        <div className="w-8 h-8 rounded-full lg:hidden block">
          <Image
            src={currentUser.image!}
            alt={currentUser.name!}
            width={100}
            height={100}
            className="rounded-full h-8 w-8"
          />
        </div>
      </div>
      <input
        className="w-full py-3 px-3 bg-[#4a4f5a] rounded-[10px] text-[12px]
      text-gray-400 outline-none"
        placeholder="Search users"
        onChange={(e) => setSearchUsers(e.target.value)}
      />
      <div className="mt-5">
        {users
          .filter((user) => {
            if (searchUsers === "") {
              return users;
            } else if (
              user.name?.toLowerCase().includes(searchUsers.toLocaleLowerCase())
            ) {
              return users;
            }
          })
          .map((user) => (
            <div className="flex flex-col gap-3" key={user.id}>
              <UserItem data={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllUsers;
