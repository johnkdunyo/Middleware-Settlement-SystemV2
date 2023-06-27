"use client";

import TableFooter from "@/components/tables/TableFooter";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const tableHeaders = [
  "TerminalId",
  "Terminal Name",
  "Transaction Count",
  "Transaction Value",
  "Gross Commision",
  "Net Commision",
  "status",
  "Txn Date",
];

const SingleTableRow = ({ ind }: { ind: number }) => {
  const router = useRouter();
  return (
    <tr
      className="border-b -z-10  group hover:bg-gray-100 whitespace-nowrap cursor-pointer text-gray-600 "
      onClick={() => router.push(`/settlements/60606/20230614170232891193`)}
    >
      <th scope="row" className="px-4 py-2 font-medium  whitespace-nowrap  ">
        20230614170232891193
      </th>
      <td className="px-4 py-2">Melcom</td>
      <td className="px-4 py-2">200</td>
      <td className="px-4 py-2">GH 6000,000.00</td>
      <td className="px-4 py-2">GH 6000,000.00</td>
      <td className="px-4 py-2">GH 6000,000.00</td>
      <td className=" rounded-md text-white py-2 ">
        <p className="bg-green-400 px-2 py-1 rounded-[20px] text-center">
          success
        </p>
      </td>
      <td className="px-4 py-2">Wed Jun 14 2023, 10:29:20</td>
    </tr>
  );
};

const SettlementByMerchantTerminalsTab = () => {
  const [openFilters, setOpenFilters] = useState(true);
  return (
    // 2xl: bsl mac upwords
    <div className=" w-full h-[62.5vh] 2xl:h-[65.5vh]   flex flex-col justify-between">
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

      <div className="tableWrapper">
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
              {Array.from({ length: 50 }).map((_, index) => (
                <SingleTableRow key={index} ind={index} />
              ))}
            </tbody>
          </table>
        </div>

        <TableFooter />
      </div>
    </div>
  );
};

export default SettlementByMerchantTerminalsTab;
