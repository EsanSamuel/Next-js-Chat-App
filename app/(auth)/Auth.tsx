"use client";
import React, { useState, useEffect } from "react";
import Input from "../components/input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const Auth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authVariant, setAuthVariant] = useState<Variant>("LOGIN");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleAuthVariant = () => {
    if (authVariant === "LOGIN") {
      setAuthVariant("REGISTER");
    } else {
      setAuthVariant("LOGIN");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/users");
      console.log(session?.user?.email);
    }
  }, [status, session?.user?.email]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      if (authVariant === "REGISTER") {
        setIsLoading(true);
        axios.post("/api/register", data).then(() =>
          signIn("credential", {
            ...data,
            redirect: false,
          })
            .catch(() => toast.error("Somthing went wrong!"))
            .finally(() => setIsLoading(false))
        );
      }

      if (authVariant === "LOGIN") {
        signIn("credential", {
          ...data,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.ok) {
              toast.success("Logged in successful!");
            }
            if (callback?.error) {
              toast.error("Somthing went wrong!");
            }
          })
          .finally(() => setIsLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogle = () => {
    try {
      setIsLoading(true);
      signIn("google", {
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            toast.success("Logged in successful!");
          }
          if (callback?.error) {
            toast.error("Somthing went wrong!");
          }
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-[#26333d] flex flex-col justify-center
     text-white shadow-lg p-8 text-center rounded-md"
    >
      <h1 className="font-bold text-xl">Create an Account!</h1>
      <p className="font-light text-[12px] mt-2">
        Enter your details to continue.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-3 w-full"
      >
        {authVariant === "REGISTER" && (
          <Input
            register={register}
            label="Name"
            id="name"
            required
            type="text"
          />
        )}
        <Input
          register={register}
          label="Email"
          id="email"
          required
          type="email"
        />
        <Input
          register={register}
          label="Password"
          id="password"
          required
          type="password"
        />

        <div className="mt-2">
          {authVariant === "REGISTER" ? (
            <Button title="Signin" />
          ) : (
            <Button title="Login" />
          )}
        </div>
      </form>
      <h1 className="mt-2 text-center text-[12px]">OR</h1>

      <div className="mt-2 font-light">
        <Button title="Continue with Google" secondary onClick={handleGoogle} />
      </div>

      <div className="mt-2">
        <span className="text-[11px] font-light">
          Don't have an account?{" "}
          <button className="underline" onClick={toggleAuthVariant}>
            Sign up
          </button>
        </span>
      </div>
    </div>
  );
};

export default Auth;
