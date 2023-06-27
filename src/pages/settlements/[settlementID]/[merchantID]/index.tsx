import React, { SetStateAction, useState } from "react";
import SettlementByMerchantStatusHeader from "../../../../components/settlements/details/SettlementByMerchantStatusHeader";
import AuthLayout from "@/layout/AuthLayout";
import SettlementByMerchantSummary from "@/components/settlements/details/SettlementByMerchantSummary";
import SettlementByMerchantTransactionsTab from "@/components/settlements/details/SettlementByMerchantTransactionsTab";

interface ITabs {
  id: number;
  title: string;
}

const settlementTabs: ITabs[] = [
  {
    id: 1,
    title: "Terminals",
  },
  {
    id: 2,
    title: "Transactions",
  },
];

interface SettlementTabButtonProps {
  tab: ITabs;
  setCurrentTab: React.Dispatch<SetStateAction<ITabs>>;
  currentTab: ITabs;
}

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

export default function SettlementDetailsPage() {
  const [currentTab, setCurrenTab] = useState(settlementTabs[1]);

  return (
    <AuthLayout>
      <div
        className={` md:ml-52 h-[89vh] mt-20 flex flex-col gap-4 overflow-clip justify-between`}
      >
        <SettlementByMerchantStatusHeader />
        <SettlementByMerchantSummary />
        <section className="w-full h-full justify-between flex flex-col">
          <ul className="flex flex-wrap text-sm font-medium text-center  border-gray-200">
            {/* {settlementTabs.map((tab) => (
              <SettlementTabButton
                key={tab.id}
                tab={tab}
                setCurrentTab={setCurrenTab}
                currentTab={currentTab}
              />
            ))} */}
            <SettlementTabButton
              key={settlementTabs[1].id}
              tab={settlementTabs[1]}
              setCurrentTab={setCurrenTab}
              currentTab={currentTab}
            />
          </ul>
          <div className="w-full bg-white h-full flex flex-col  border ">
            <SettlementByMerchantTransactionsTab />
            {/* {currentTab.title === "Transactions" && (
              <SettlementByMerchantTransactionsTab />
            )}
            {currentTab.title === "Terminals" && (
              <SettlementByMerchantTerminalsTab />
            )} */}
          </div>
        </section>
      </div>
    </AuthLayout>
  );
}
