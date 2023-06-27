import React, { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import API from "@/network/api";
import { IMerchantDetails } from "@/types/merchant";
import AuthLayout from "@/layout/AuthLayout";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MerchantSummary from "@/components/merchantComps/details/MerchantSummary";
import MerchantRoutesTab from "@/components/merchantComps/details/MerchantRoutesTab";
import MerchantTerminalsTab from "@/components/merchantComps/details/MerchantTerminalsTab";

// type Params = {
//   params: {
//     merchantExID: number;
//   };
// };

interface ITabs {
  id: number;
  title: string;
}

interface SettlementTabButtonProps {
  tab: ITabs;
  setCurrentTab: React.Dispatch<SetStateAction<ITabs>>;
  currentTab: ITabs;
}

const settlementTabs: ITabs[] = [
  {
    id: 1,
    title: "Merchant Routes",
  },
  {
    id: 2,
    title: "Terminals",
  },
];

const SettlementTabButton = ({
  tab,
  setCurrentTab,
  currentTab,
}: SettlementTabButtonProps) => {
  const active = false;
  return (
    <button
      className={`mr-2 group ${
        tab.id === currentTab.id
          ? "text-blue-600 bg-white border-t border-l border-r"
          : " text-gray-600 bg-gray-100 hover:bg-gray-200/90 "
      }   rounded-t-lg py-2 px-4  text-lg `}
      onClick={() => setCurrentTab(tab)}
    >
      <h1 className="">{tab.title}</h1>
    </button>
  );
};

const Page = () => {
  const [currentTab, setCurrenTab] = useState(settlementTabs[0]);
  const [merchantDetails, setMerchantDetails] = useState<IMerchantDetails>();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const router = useRouter();
  console.log(router.query.merchantExID);

  const merchantExID = router.query.merchantExID;

  useEffect(() => {
    setIsLoadingData(true);
    API.get(`/merchants/${merchantExID}`)
      .then((response) => {
        setMerchantDetails(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "an error occured");
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, [merchantExID]);

  console.log(merchantDetails);

  return (
    <AuthLayout>
      <div className=" md:ml-52 h-[89vh] mt-20 overflow-clip  flex flex-col gap-4 justify-between">
        <div className="w-full flex flex-col justify-between border-b">
          <div className="flex gap-2 items-center mt-3">
            <h1 className="font-medium text-xl text-black hover:underline">
              <Link href="/merchants">Merchants</Link>
            </h1>
            <svg
              className="w-6 h-6 text-gray-500 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p>{merchantExID}</p>
          </div>
        </div>
        <MerchantSummary
          setMerchantDetails={setMerchantDetails}
          merchantName={merchantDetails?.name!}
          bankAccountName={merchantDetails?.bankAccountName!}
          bankAccountNumber={merchantDetails?.bankAccountNumber!}
          dateCreated="Jun 15, 2023 3:05PM"
          bankName={merchantDetails?.bankName!}
          bankBranchCode={merchantDetails?.bankBranchCode!}
          terminalsCount={merchantDetails?.terminals.length! | 0}
          routesCount={merchantDetails?.routes.length || 0}
        />

        <section className="w-full h-full justify-between flex flex-col">
          <ul className="flex flex-wrap text-sm font-medium text-center  border-gray-200">
            {settlementTabs.map((tab) => (
              <SettlementTabButton
                key={tab.id}
                tab={tab}
                setCurrentTab={setCurrenTab}
                currentTab={currentTab}
              />
            ))}
          </ul>
          <div className="w-full bg-white h-full flex flex-col border ">
            {currentTab.id === 1 && (
              <MerchantRoutesTab
                merchantRoutes={merchantDetails?.routes!}
                isLoading={isLoadingData}
                setMerchantDetails={setMerchantDetails}
              />
            )}
            {currentTab.id === 2 && (
              <MerchantTerminalsTab
                isLoading={isLoadingData}
                merchantTerminals={merchantDetails?.terminals!}
                setMerchantDetails={setMerchantDetails}
              />
            )}
          </div>
        </section>
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
