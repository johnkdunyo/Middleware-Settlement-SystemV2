import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const SettlementStatusHeader = ({ status = "pending" }: { status: string }) => {
  const params = useParams();

  return (
    <section className="w-full flex  justify-between border-b py-1 items-end">
      <div className="text-gray-600">
        <h1>
          <Link href="/" className="hover:underline">
            SettlementID:
          </Link>{" "}
          <span className="font-medium text-gray-600">
            {params.settlementID}
          </span>
        </h1>
      </div>
      <div>
        <p className="border px-3 py-1 text-sm text-center bg-green-600 text-white rounded-2xl">
          {status}
        </p>
      </div>
    </section>
  );
};

export default SettlementStatusHeader;
