import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { getSession, signOut, useSession } from "next-auth/react";
import AuthLayout from "@/layout/AuthLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateSettlement from "@/components/settlements/CreateSettlement";

interface IndexCardComponent {
  title: string;
  onClickHandler: () => void;
}

const IndexCardComponent = ({ title, onClickHandler }: IndexCardComponent) => {
  return (
    <div
      className="  h-[10rem] w-[18rem]  text-center border bg-white w-col  border-gray-600  rounded-lg flex flex-col justify-center items-center gap-1 group hover:bg-gray-50 cursor-pointer"
      onClick={onClickHandler}
    >
      <h1 className="font-medium text-xl">{title}</h1>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  return (
    <AuthLayout>
      <div
        className={` md:ml-52  h-[89vh] mt-20 overflow-scroll  flex flex-col gap-4 border `}
      >
        <div className="flex gap-20 h-full  items-center justify-center">
          <IndexCardComponent
            title="Create Settlement"
            onClickHandler={() => setOpenModal(true)}
          />
          <IndexCardComponent
            title="Reports"
            onClickHandler={() => router.push("/settlements")}
          />
        </div>
        <div className="my-20"></div>

        <CreateSettlement openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </AuthLayout>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
