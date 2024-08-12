import Button from "@/app/components/Button";
import Input from "@/app/components/input";
import Modal from "@/app/components/Modal";
import Select from "@/app/components/Select";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { format, formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

interface Props {
  users?: User[];
  onClose?: () => void;
  isOpen: boolean;
  user?: User;
}

const Setting: React.FC<Props> = ({ users, onClose, isOpen, user }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: "",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .patch(`/api/settings/${user?.id}`, {
        ...data,
      })
      .then(() => toast.success("Profile Edited!"));
  };

  const uploadImage = (result: any) => {
    axios
      .patch(`/api/settings/${user?.id}`, {
        image: result?.info?.secure_url,
      })
      .then(() => toast.success("Profile Picture Edited!"));
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form
        className="text-gray-400 text-center flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-white lg:mt-0 mt-2 ">Settings</h1>
        <p className="text-[12px] font-light">
          Change your name, image or add bio.
        </p>
        <div className="mt-3 flex flex-col gap-2 justify-center items-center">
          <Image
            src={user?.image || "/placeholder.png"}
            height={100}
            width={100}
            className="w-20 h-20 rounded-full"
            alt="Profile picture"
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onSuccess={uploadImage}
            uploadPreset="esbk4pom"
          >
            <HiPhoto size={24} className="text-gray-400 cursor-pointer" />
          </CldUploadButton>
          <p className="font-light text-gray-400 text-[12px]">
            Joined {formatDistanceToNowStrict(new Date(user?.createdAt!))} ago.
          </p>
        </div>
        <Input
          register={register}
          label="Edit name"
          id="name"
          required
          type="text"
          isGroup
          //value={user?.name}
        />
        <Input
          register={register}
          label="Edit Bio"
          id="bio"
          required
          type="text"
          isGroup
          //value={user?.bio}
        />

        <Button title="Edit Profile" />
      </form>
    </Modal>
  );
};

export default Setting;
