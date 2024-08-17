"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType, FullMessageType } from "@/types";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { format, formatDistanceToNowStrict } from "date-fns";
import GalleryBox from "./GalleryBox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";

interface ChatModalProps {
  conversation: FullConversationType | any;
  onClose: () => void;
  messages: FullMessageType[] | any[];
}

const ChatModal: React.FC<ChatModalProps> = ({
  conversation,
  onClose,
  messages,
}) => {
  const router = useRouter();
  const otherUser = useOtherUser(conversation);
  const handleClick = () => {
    router.push(`/room/${conversation.id}`);
  };
  const updateGroupImage = (result?: any) => {
    axios.patch(`/api/conversations/${conversation.id}`, {
      isMulti: true,
      groupImage: result?.info?.secure_url,
    })
    .then(()=> toast.success("Group Image updated!"));
  };
  return (
    <div className="h-[100vh] w-[350px] bg-[#131313] shadow-lg right-0 fixed p-5 overflow-y-auto z-100">
      <div className="flex justify-between  text-white">
        <h1 className="text-[15px] font-bold">Chat details</h1>
        <IoClose className="h-6 w-6 cursor-pointer" onClick={onClose} />
      </div>
      <div className="mt-3 flex flex-col gap-2 justify-center items-center">
        {conversation.isMulti ? (
          <div
            className="relative inset-block overflow-hidden
                 w-11 h-11 rounded-[10px]"
          >
            <Image
              src={conversation.groupImage || "/group.png"}
              className="rounded-[10px]"
              fill
              quality={100}
              alt="Image"
            />
          </div>
        ) : (
          <Image
            src={otherUser?.image || "/placeholder.png"}
            height={100}
            width={100}
            className="w-20 h-20 rounded-full"
            alt="Profile picture"
          />
        )}

        {conversation?.isMulti && (
          <div>
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onSuccess={updateGroupImage}
              uploadPreset="esbk4pom"
            >
              <HiPhoto size={24} className="text-gray-400" />
            </CldUploadButton>
          </div>
        )}

        <h1 className="text-[15px] text-white">
          {conversation?.groupName || otherUser?.name}
        </h1>
        <div>
          {!conversation.isMulti && (
            <p className="text-gray-400 text-[10px]">{otherUser?.email}</p>
          )}
        </div>
        <div>
          {!conversation.isMulti && (
            <p className="text-gray-400 text-[10px]">{otherUser?.bio}</p>
          )}
        </div>
        <div>
          {conversation.isMulti ? (
            <p className="text-gray-400 text-[12px]">
              Created on {format(new Date(otherUser?.createdAt), "MMM")}{" "}
              {format(new Date(otherUser?.createdAt), "dd")},{" "}
              {format(new Date(conversation.createdAt), "yyyy")}.
            </p>
          ) : (
            <p className="text-gray-400 text-[12px]">
              Joined on {format(new Date(otherUser?.createdAt), "MMM")}{" "}
              {format(new Date(otherUser?.createdAt), "dd")},{" "}
              {format(new Date(conversation.createdAt), "yyyy")}.
            </p>
          )}
        </div>
      </div>

      {conversation.isMulti && (
        <div>
          <h1 className="text-[15px] text-white text-start mt-5">Members</h1>
          <div className="flex flex-col gap-2 mt-2">
            {conversation.users.map((member: any) => (
              <div
                className="flex gap-2 items-center cursor-pointer hover:opacity-50"
                key={member.id}
                onClick={handleClick}
              >
                <Image
                  src={member.image || "/placeholder.png"}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-8 h-8 rounded-full"
                />
                <h1 className="text-gray-400 text-[10px]">{member.name}</h1>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-col">
        <h1 className="text-[15px] text-white text-start">Gallery</h1>
        <div>
          {messages.length > 0 ? (
            <div className="grid gap-2 grid-cols-3 w-full mt-2">
              {messages?.map((message) => (
                <div className="">
                  <GalleryBox image={message?.image} key={message.id} />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-gray-400 text-[12px]">No Gallery yet!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
