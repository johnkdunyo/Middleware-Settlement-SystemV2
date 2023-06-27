"use client";

import TableFooter from "@/components/tables/TableFooter";
import TableLoader from "@/components/tables/TableLoader";
import TableNoDataFound from "@/components/tables/TableNoDataFound";
import { ISettlementRoutes } from "@/types/settlement";
import formatCurrency from "@/utils/formatCurrency";
import React, { useState } from "react";

interface RoutesTabProps {
  isLoading: boolean;
  settlementRoutes: ISettlementRoutes[];
}

const tableHeaders = [
  "rSwitch",
  "Transaction Count",
  "Transaction Value",
  "Gross Commission",
  "Processor Commission",
  "Net Commission",
  "Amount Payable",
];

const SingleTableRow = ({ route }: { route: ISettlementRoutes }) => {
  return (
    <tr className="border-b -z-10  group hover:bg-gray-100 whitespace-nowrap cursor-pointer text-gray-600 ">
      <th scope="row" className="px-4 py-2 font-medium  whitespace-nowrap  ">
        {route.rSwitch}
      </th>
      <td className="px-4 py-2">{route.transactionCount}</td>
      <td className="px-4 py-2">{route.transactionValue}</td>

      <td className="px-4 py-2">
        {formatCurrency(Number(route.grossCommission))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(route.processorCommission))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(route.netCommission))}
      </td>

      <td className="px-4 py-2">{route.amountPayable}</td>
    </tr>
  );
};

const RoutesTab = ({ isLoading, settlementRoutes }: RoutesTabProps) => {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <div className=" w-full h-[42vh] 2xl:h-[49.5vh]  flex flex-col justify-between">
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

      <div className=" tableWrapper">
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
              {settlementRoutes &&
                settlementRoutes.map((route, index) => (
                  <SingleTableRow key={index} route={route} />
                ))}
            </tbody>
          </table>
        </div>

        {isLoading && <TableLoader showBackground={false} />}
        {settlementRoutes && !isLoading && <TableNoDataFound title="Route" />}

        <TableFooter />
      </div>
    </div>
  );
};

export default RoutesTab;
