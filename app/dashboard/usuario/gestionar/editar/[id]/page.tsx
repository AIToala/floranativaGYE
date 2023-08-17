"use client";

import { UserEditForm } from "@/app/components/UserEditForm";

interface IParams {
  id: string;
}

const UserEditPage = ({ params }: { params: IParams }) => {
  const id = params.id;
  return (
    <div className="flex flex-col w-full mx-4 !my-2 items-start h-full !mt-50 mr-10">
      <h1 className="scroll-m-20  pb-2 text-3xl font-bold tracking-tight transition-colors mt-5">
        Editar Usuario
      </h1>
      <UserEditForm id={id} />
    </div>
  );
};

export default UserEditPage;
