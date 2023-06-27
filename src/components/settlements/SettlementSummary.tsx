import DataCardComponent from "@/components/cards/DataCardComponent";
import { ISettlementSummary } from "@/types/settlement";
import formatCurrency from "@/utils/formatCurrency";
import React from "react";

interface SettlementSummaryProps {
  settlementSummary: ISettlementSummary;
  isLoading: boolean;
}

interface IDataCardComponent2 {
  title: string;
  value: number | string;
  isCurrency?: boolean;
}

const DataCardComponent2 = ({
  title,
  value,
  isCurrency = false,
}: IDataCardComponent2) => {
  return (
    <div className="flex flex-col justify-start px-4 py-3 border w-full gap-1 bg-white border-gray-400 rounded-md">
      <p className="text-sm tracking-tight font-medium text-[#0F172A]">
        {title}
      </p>
      <h1 className="font-bold text-xl whitespace-nowrap text-primary-600">
        {isCurrency ? formatCurrency(Number(value)) : value}
      </h1>
    </div>
  );
};

const SettlementSummary = ({
  settlementSummary,
  isLoading,
}: SettlementSummaryProps) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 w-full gap-6">
      <DataCardComponent2
        title="Transaction Value"
        value={settlementSummary?.transactionValue || 0}
        isCurrency={true}
      />

      <DataCardComponent2
        title="Gross Commission"
        value={settlementSummary?.grossCommission || 0}
        isCurrency={true}
      />
      <DataCardComponent2
        title="Processor Commission"
        value={settlementSummary?.processorCommission || 0}
        isCurrency={true}
      />
      <DataCardComponent2
        title="Net Commission"
        value={settlementSummary?.netCommission || 0}
        isCurrency={true}
      />

      <DataCardComponent2
        title="Amout Payable"
        value={settlementSummary?.amountPayable || 0}
        isCurrency={true}
      />
      <DataCardComponent2
        title="Transaction Count"
        value={settlementSummary?.transactionCount || 0}
      />
    </section>
  );
};

export default SettlementSummary;
