"use client";

import TableFooter from "@/components/tables/TableFooter";
import TableLoader from "@/components/tables/TableLoader";
import TableNoDataFound from "@/components/tables/TableNoDataFound";
import { ISettlementMerchants } from "@/types/settlement";
import formatCurrency from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";

interface MerchantsTabProps {
  isLoading: boolean;
  settlementMerchants: ISettlementMerchants[] | ISettlementMerchants;
  showSettledAtDate?: boolean;
}

const SingleTableRow = ({ merchant }: { merchant: ISettlementMerchants }) => {
  return (
    <tr className="border-b -z-10  group hover:bg-gray-100 whitespace-nowrap cursor-pointer text-gray-600 ">
      <th scope="row" className="px-4 py-2 font-medium  whitespace-nowrap  ">
        {merchant?.name}
      </th>
      <td className="px-4 py-2">{merchant?.transactionCount}</td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.transactionValue) || 0)}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.grossCommission) || 0)}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.processorCommission) || 0)}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.netCommission) || 0)}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.amountPayable) || 0)}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.mtnCost) || 0)}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.vodafoneCashCost) || 0)}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(merchant?.atmoneyCost) || 0)}
      </td>
      {merchant?.settledAt && (
        <td className="px-4 py-2">{formatDate(merchant?.settledAt!)}</td>
      )}
    </tr>
  );
};

const MerchantsTab = ({
  isLoading,
  settlementMerchants,
  showSettledAtDate = true,
}: MerchantsTabProps) => {
  const [openFilters, setOpenFilters] = useState(false);

  let tableHeaders = [
    "Name",
    "Transaction Count",
    "Transaction Value",
    "Gross Commission",
    "Processor Commission",
    "Net Commission",
    "amount Payable",
    "MTN Cost",
    "Vodafone Cash Cost",
    "AirtelTigo Cost",
  ];

  showSettledAtDate && tableHeaders.push("Settled At");

  return (
    // 2xl: bsl mac upwords
    <div className=" w-full h-[42vh] xl:h-[40vh] 2xl:h-[49.5vh]   xl:border-red-700  2xl:border-blue-700 flex flex-col justify-between">
      {openFilters && (
        <div className="w-full border-b  ">
          <form className="flex items-center p-3 pb-1.5 w-full gap-4">
            <div className="w-1/4">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full pl-10 p-2  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                  placeholder="by merchantId, etc"
                />
              </div>
            </div>

            {/* search filters */}
            <div className="w-3/4  flex justify-end gap-4">
              <button className=" w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium border rounded-lg hover:bg-gray-100 hover:text-primary-600">
                Clear
              </button>

              <button
                className=" w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium bg-green-600 text-white border rounded-lg hover:bg-green-700"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      <div className=" tableWrapper  border-green-600 ">
        <div className="overflow-auto ">
          <table className="w-full text-sm text-left   table-auto">
            <thead className="sticky top-0 text-xs text-gray-700 uppercase  border-b border-black bg-white ">
              <tr className="">
                <th className="px-4 py-3  bg-white " scope="col">
                  {tableHeaders[0]}
                </th>
                {tableHeaders.slice(1).map((header, _x) => (
                  <th key={_x} scope="col" className="px-4 py-3  ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {settlementMerchants &&
                Array.isArray(settlementMerchants) &&
                settlementMerchants.map((merchant, _x) => (
                  <SingleTableRow key={_x} merchant={merchant} />
                ))}

              {!Array.isArray(settlementMerchants) && (
                <SingleTableRow
                  merchant={settlementMerchants as ISettlementMerchants}
                />
              )}
            </tbody>
          </table>
        </div>

        {isLoading && <TableLoader showBackground={false} />}
        {settlementMerchants &&
          Array.isArray(settlementMerchants) &&
          settlementMerchants.length === 0 &&
          !isLoading && <TableNoDataFound title="Merchant" />}

        <TableFooter />
      </div>
    </div>
  );
};

export default MerchantsTab;
