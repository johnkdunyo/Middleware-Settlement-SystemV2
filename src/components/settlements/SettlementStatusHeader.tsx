import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";

const SettlementStatusHeader = ({
  status = "pending",
  refreshData,
  isLoading,
}: {
  status: string;
  refreshData: () => void;
  isLoading: boolean;
}) => {
  const router = useRouter();

  return (
    <section className="w-full flex  justify-between border-b py-1 items-end">
      <div className="text-gray-600">
        <h1>
          <Link href="/" className="hover:underline">
            SettlementID:
          </Link>{" "}
          <span className="font-medium text-gray-600">
            {router.query.settlementID}
          </span>
        </h1>
      </div>
      <div className="flex gap-3">
        <p className="border px-3 py-1.5 text-sm text-center bg-green-600 text-white rounded-2xl">
          {status}
        </p>
        <button
          onClick={refreshData}
          className={`border px-2 border-black rounded-lg text-sm ${
            isLoading && "cursor-not-allowed"
          } `}
        >
          {isLoading ? "Refreshing" : "Refresh"}
        </button>
      </div>
    </section>
  );
};

export default SettlementStatusHeader;
