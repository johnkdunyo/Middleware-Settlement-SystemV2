import React, { SetStateAction, useState, useEffect } from "react";
import SettlementStatusHeader from "./SettlementStatusHeader";

import API from "@/network/api";

import { ISettlementDetails } from "@/types/settlement";
import { IPageMeta } from "@/types/pageMeta";
import Modal from "@/components/modals";
import { toast } from "react-toastify";
import { ITabs } from "@/types/tab";

import { useRouter } from "next/router";
import AuthLayout from "@/layout/AuthLayout";
import { getSession } from "next-auth/react";
import SettlementSummary from "@/components/settlements/SettlementSummary";
import SettlementTabButton from "@/components/settlements/SettlementTabButton";
import RoutesTab from "@/components/settlements/RoutesTab";
import MerchantsTab from "@/components/settlements/MerchantsTab";

type Params = {
  params: {
    settlementID: number;
  };
};

const settlementTabs: ITabs[] = [
  {
    id: 1,
    title: "Merchants",
  },
  {
    id: 2,
    title: "Routes",
  },
];

export default function SettlementDetailsPage() {
  const router = useRouter();
  const settlementID = Array.isArray(router.query.merchantExID)
    ? router.query.merchantExID[0]
    : router.query.merchantExID;
  const [isLoading, setIsLoading] = useState(false);
  const [openSettleModal, setOpenSettleModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [settlementDetails, setSettlementDetails] =
    useState<ISettlementDetails>();
  const [pageMeta, setPageMeta] = useState<IPageMeta>();

  const [currentTab, setCurrenTab] = useState(settlementTabs[0]);

  useEffect(() => {
    setIsLoading(true);
    API.get(`/settlements/${settlementID}`)
      .then((response) => {
        // console.log(response.data);
        setPageMeta(response.data.meta);
        setSettlementDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onSettleHandler = () => {
    API.put(`/settlements/${settlementID}`, { status: "settled" })
      .then((response) => {
        console.log(response);
        toast.success("Settled successfully");
        setOpenSettleModal(false);
        API.get(`/settlements/${settlementID}`)
          .then((response) => {
            // console.log(response.data);
            setPageMeta(response.data.meta);
            setSettlementDetails(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteHandler = () => {
    API.delete(`/settlements/${settlementID}`)
      .then((response) => {
        console.log(response);
        toast.success("Roll back successfully");
        router.push(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthLayout>
      <div
        className={` md:ml-52 h-[89vh] mt-20 flex flex-col gap-4 overflow-clip justify-between`}
      >
        <SettlementStatusHeader
          status={settlementDetails?.canRollback ? "pending" : "settled"}
        />
        <SettlementSummary
          settlementSummary={settlementDetails?.summary!}
          isLoading={isLoading}
        />
        <section className="w-full h-full  justify-between flex flex-col mt-5">
          <div className="flex justify-between items-center">
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

            <div className="flex justify-between gap-10">
              {settlementDetails?.canRollback && (
                <div className="flex gap-4">
                  <button
                    className="border px-3 py-1 rounded-md text-green-900 border-green-800 bg-white hover:bg-slate-50"
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    Roll Back
                  </button>
                  <button
                    className="border px-3 py-1 rounded-md bg-green-800 text-white gover:bg-green-900"
                    onClick={() => setOpenSettleModal(true)}
                  >
                    Settle
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full bg-white h-full flex flex-col  border ">
            {currentTab.title === "Routes" && (
              <RoutesTab
                isLoading={isLoading}
                settlementRoutes={settlementDetails?.routes!}
              />
            )}
            {currentTab.title === "Merchants" && (
              <MerchantsTab
                isLoading={isLoading}
                settlementMerchants={settlementDetails?.merchants!}
                showSettledAtDate={false}
              />
            )}
          </div>
        </section>
      </div>

      {/* settle */}
      <Modal
        open={openSettleModal}
        onClose={() => setOpenSettleModal(false)}
        title="Settle"
        dialogWrapperClass="w-[30%] p-2"
      >
        <div className="my-5 flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-medium -tracking-wide">
            Are you sure you want to settle?
          </h1>
          <p className="">This action is irreversible</p>
          <div className="my-3 flex gap-4">
            <button
              className="py-2 px-6 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  hover:text-gray-900 focus:z-10"
              onClick={() => setOpenSettleModal(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-6 text-sm font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-900   "
              onClick={onSettleHandler}
            >
              Settle
            </button>
          </div>
        </div>
      </Modal>

      {/* roll back */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Settle"
        dialogWrapperClass="w-[30%] p-2"
      >
        <div className="my-5 flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-medium -tracking-wide">
            Are you sure you want to roll back?
          </h1>
          <p className="">This action is irreversible</p>
          <div className="my-3 flex gap-4">
            <button
              className="py-2 px-6 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  hover:text-gray-900 focus:z-10"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-6 text-sm font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-900   "
              onClick={onDeleteHandler}
            >
              Roll Back
            </button>
          </div>
        </div>
      </Modal>
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
