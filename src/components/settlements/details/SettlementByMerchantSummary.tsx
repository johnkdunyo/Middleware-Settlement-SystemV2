import DataCardComponent from "@/components/cards/DataCardComponent";
import React from "react";

const SettlementByMerchantSummary = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 w-full gap-8">
      <DataCardComponent title="Total Terminals" value={4} />
      <DataCardComponent title="Transaction Count" value={545465} />
      <DataCardComponent
        title="Gross Commission"
        value={545465}
        type={"currency"}
      />
      <DataCardComponent
        title="Net Commission"
        value={545465}
        type={"currency"}
      />
    </section>
  );
};

export default SettlementByMerchantSummary;
