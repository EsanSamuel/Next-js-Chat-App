import Button from "@/app/components/Button";
import Input from "@/app/components/input";
import Modal from "@/app/components/Modal";
import Select from "@/app/components/Select";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

interface Props {
  users: User[];
  onClose?: () => void;
  isOpen: boolean;
}

const CreateGroupModal: React.FC<Props> = ({ users, onClose, isOpen }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      groupName: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/conversations", {
      ...data,
      isMulti: true,
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form
        className="text-gray-400 text-center flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-white lg:mt-0 mt-3">Create Group</h1>
        <p className="text-[12px] font-light">
          Create a group with more than two participants
        </p>
        <Input
          register={register}
          label="Group name"
          id="groupName"
          required
          type="text"
          isGroup
        />

        <Select
          disabled={loading}
          label="Members"
          options={users.map((user) => ({
            value: user.id,
            label: user.name,
          }))}
          onChange={(value) =>
            setValue("members", value, { shouldValidate: true })
          }
          value={members}
        />
        <Button title="Create Group"/>
      </form>

    </Modal>
  );
};

export default CreateGroupModal;
