import getUserById from "@/app/actions/getUserById";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useSession } from "next-auth/react";
import { TbPinnedFilled } from "react-icons/tb";
import axios from "axios";
import { RiUnpinFill } from "react-icons/ri";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { Pinned } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ConversationBoxProps {
  data: FullConversationType | any;
  isPinned?: boolean;
  pinn?: Pinned;
}

const ConversationBox = ({ data, isPinned, pinn }: ConversationBoxProps) => {
  const { data: session } = useSession();
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const pathname = usePathname();
  const userEmail = session?.user?.email;

  const handleClick = () => {
    router.push(`/room/${data.id}`);
  };

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    console.log(messages);
    return messages[messages.length - 1];
  }, [data.messages]);

  const hasSeenMessage = useMemo(() => {
    if (!lastMessage) {
      return null;
    }
    const seenMessage = lastMessage.seen || [];

    if (!userEmail) {
      return null;
    }

    return (
      seenMessage.filter((user: any) => user.email === userEmail).length !== 0
    );
  }, [lastMessage, userEmail]);

  const lastMessageToBeShown = useMemo(() => {
    if (lastMessage?.text) {
      return lastMessage?.text;
    }

    if (lastMessage?.image) {
      return (
        <div
          className={`flex gap-2 items-center text-gray-400 ${
            hasSeenMessage && "text-white font-bold"
          }`}
        >
          <HiPhoto size={18} className="" />
          <p className="text-[10px]">Sent an image!</p>
        </div>
      );
    }

    return "Started a conversation!";
  }, [lastMessage]);

  const PinnedChat = () => {
    axios.post("/api/pinned_chat", {
      conversationId: data.id,
    });
  };

  const unPinnChat = () => {
    axios.delete(`/api/pinned_chat/${pinn?.id}`);
  };
  return (
    <div
      className={`flex justify-between text-white px-3 py-3 hover:bg-[#4a4f5a] rounded-[10px]
items-center cursor-pointer ${
        pathname === `/room/${data.id}` && "bg-[#4a4f5a] "
      }`}
    >
      <div className="flex gap-4" onClick={handleClick}>
        {data.isMulti ? (
          <div
            className="relative inset-block overflow-hidden
     w-11 h-11 rounded-[10px]"
          >
            <Image
              src={data.groupImage || "/group.png"}
              className="rounded-[10px]"
              fill
              quality={100}
              alt="Image"
            />
          </div>
        ) : (
          <Avatar user={otherUser!} notRounded />
        )}
        <div className="flex flex-col gap-1">
          <h1 className="font-light text-[13px]">
            {data?.groupName || otherUser?.name}
          </h1>
          <div>
            <p
              className={`text-[10px] truncate w-full ${
                hasSeenMessage ? "text-gray-400" : "text-white font-bold"
              }`}
            >
              {lastMessageToBeShown}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        {!isPinned ? (
          <TbPinnedFilled
            size={24}
            className="text-gray-400 z-50"
            onClick={PinnedChat}
          />
        ) : (
          <RiUnpinFill
            size={24}
            className="text-gray-400 z-50"
            onClick={unPinnChat}
          />
        )}
      </div>
    </div>
  );
};

export default ConversationBox;
