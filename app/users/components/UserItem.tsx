import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import Avatar from "@/app/components/Avatar";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserItem = ({ data }: { data: User }) => {
  const router = useRouter();
  const handleClick = async () => {
    axios
      .post(`api/conversations`, {
        userId: data.id,
      })
      .then((data) => router.push(`/room/${data.data.id}`));
  };
  return (
    <div
      className="flex gap-4 text-white px-3 py-3 hover:bg-[#4a4f5a] rounded-[10px]
    items-center cursor-pointer"
      onClick={handleClick}
    >
      <Avatar user={data} notRounded />
      <div className="flex flex-col gap-2">
        <h1 className="font-light text-[13px]">{data?.name}</h1>
        <div>
          <p className="text-[10px] text-gray-400">{data?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
