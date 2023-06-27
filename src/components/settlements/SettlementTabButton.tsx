import React, { SetStateAction } from "react";

interface ITabs {
  id: number;
  title: string;
}

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

export default SettlementTabButton;
