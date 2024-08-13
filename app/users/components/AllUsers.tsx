"use client";
import getUsers from "@/app/actions/getUsers";
import React, { useState } from "react";
import UserItem from "./UserItem";
import { User } from "@prisma/client";

const AllUsers = ({ users }: { users: User[] }) => {
  const [searchUsers, setSearchUsers] = useState("");
  return (
    <div className="fixed bg-[#2e333d] lg:w-80 w-full overflow-y-auto lg:left-20 lg:block lg:px-10 lg:py-5 p-2 h-[100vh]
    lg:first:rounded-l-[20px]">
      <h1 className="font-bold pb-2 text-[15px] text-white">Users</h1>
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
            <div className="flex flex-col gap-3">
              <UserItem key={user.id} data={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllUsers;
