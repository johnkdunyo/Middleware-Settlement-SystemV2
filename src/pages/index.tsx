import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { getSession, signOut, useSession } from "next-auth/react";

export default function Home() {
  return <div>hello</div>;
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
