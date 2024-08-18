"use client";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

interface FormProps {
  conversationId: string;
}

const Form: React.FC<FormProps> = ({ conversationId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("text", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const uploadImage = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="flex w-full items-center justify-center lg:gap-4 gap-2 lg:pb-3 lg:px-5 p-2 text-gray-400 fixed">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center justify-center lg:gap-4 gap-2 lg:pb-3 lg:px-5 p-2"
      >
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={uploadImage}
          uploadPreset="esbk4pom"
        >
          <HiPhoto size={24} className="text-gray-400 cursor-pointer" />
        </CldUploadButton>
        <input
          className="w-full bg-[#4a4f5a] text-[13px] p-3 rounded-[10px] text-white"
          placeholder="Enter Message"
          {...register("text")}
        />
        <button type="submit">
          <HiPaperAirplane size={24} className="text-gray-400" />
        </button>
      </form>
    </div>
  );
};

export default Form;
