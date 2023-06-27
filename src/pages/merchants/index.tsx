import React, { useEffect, useState } from "react";
import AddMerchant from "./AddMerchant";
import MerchantsTable from "./MerchantsTable";
import { IMerchantData } from "@/types/merchant";
import { IPageMeta } from "@/types/pageMeta";
import API from "@/network/api";
import { toast } from "react-toastify";
import AuthLayout from "@/layout/AuthLayout";
import { getSession, signOut, useSession } from "next-auth/react";

const Page = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [merchantsData, setMerchantsData] = useState<IMerchantData[]>();
  const [pageMeta, setPageMeta] = useState<IPageMeta>();

  useEffect(() => {
    setIsLoadingData(true);

    API.get(`/merchants`)
      .then((response) => {
        setMerchantsData(response.data.data);
        setPageMeta(response.data.meta);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An error occured");
      })
      .finally(() => setIsLoadingData(false));
  }, []);

  return (
    <AuthLayout>
      <div className=" md:ml-52 h-[89vh] 2xl:h-[90vh] mt-20 overflow-scroll  flex flex-col gap-4">
        <AddMerchant setMerchantsData={setMerchantsData} />
        <MerchantsTable
          isLoadingData={isLoadingData}
          merchantsData={merchantsData}
        />
      </div>
    </AuthLayout>
  );
};

export default Page;

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
