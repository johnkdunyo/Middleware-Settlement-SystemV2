import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SettlementByMerchantStatusHeader = () => {
  const router = useRouter();

  return (
    <section className="w-full flex  justify-between border-b py-1 items-end">
      <div className="text-gray-600 flex flex-col">
        <h1>
          <Link href="/" className="hover:underline">
            SettlementID:
          </Link>{" "}
          <span className="font-medium text-gray-600">
            {router.query.settlementID}
          </span>
        </h1>
        <h1>
          <Link href="/settlements/60606" className="hover:underline">
            Merchant:
          </Link>{" "}
          <span className="font-medium text-gray-600">
            {router.query.merchantID}
          </span>
        </h1>
      </div>
      <div>
        <p className="border px-2 py-1 text-center bg-green-600 text-white rounded-2xl">
          pending
        </p>
      </div>
    </section>
  );
};

export default SettlementByMerchantStatusHeader;
