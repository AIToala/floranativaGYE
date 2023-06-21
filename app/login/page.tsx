"use client";

import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { signIn, useSession } from "next-auth/react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/app/components/buttons/Button";
import Link from "next/link";
import { MouseEvent, useState } from "react";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (session?.data?.user?.email) {
    router.push("/");
    return null;
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.email === "" || data.password === "") {
      toast.error("Por favor, llene todos los campos");
      return;
    }
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.error) {
        toast.error("Correo y/o contraseña incorrectos");
      } else if (callback?.ok) {
        toast.success("Inicio de sesión exitos\nBienvenido");
        router.refresh();
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="w-full my-10 items-center justify-center flex flex-col">
      <div className="text-center mb-8">
        {/* Logo */}
        <img
          src="/images/logo.svg"
          alt="Arbolista Logo"
          className="h-24 mx-auto mb-4"
        />
        {/* Heading */}
        <Heading center title="Bienvenido a Arbolista" subtitle="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 mb-10 justify-center">
        <div className="flex flex-col col-span-1 gap-4">
          <div className="flex flex-col gap-4 ">
            <Heading
              center
              title=""
              subtitle="Inicia sesión y ayúdanos a crear un mejor catálogo de plantas de Guayaquil."
            />
            <hr />
          </div>
          <div className="flex flex-col gap-4 mt-4  mb-100">
            <Input
              disabled={isLoading}
              id="email"
              type="email"
              label="Correo"
              register={register}
              errors={errors}
              required
            />
            <Input
              disabled={isLoading}
              id="password"
              type="password"
              label="Contraseña"
              register={register}
              errors={errors}
              required
            />
            <Button
              label="Iniciar sesión"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex flex-col col-span-1 justify-center mb-15 mt-25 bg-green-500 p-2 rounded-md ">
          <p className="text-center mb-10 !text-white">
            ¿Quieres formar parte de nosotros? Envía un correo aquí.
          </p>
          <div className="btn-sm flex justify-center">
            <Button
              label="Continuar como invitado"
              onClick={() => router.push("/home")}
              style="bg-white !text-black !py-2 !px-2 !w-[50%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
