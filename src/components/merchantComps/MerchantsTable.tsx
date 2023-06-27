"use client";

import TableFooter from "@/components/tables/TableFooter";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TableLoader from "@/components/tables/TableLoader";
import API from "@/network/api";
import { IMerchant, IMerchantData } from "@/types/merchant";
import { IPageMeta } from "@/types/pageMeta";
import TableNoDataFound from "@/components/tables/TableNoDataFound";
import { formatDate } from "@/utils/formatDate";
import { toast } from "react-toastify";

interface MerchantsTableProps {
  isLoadingData: boolean;
  merchantsData: IMerchantData[] | undefined;
}

const tableHeaders = [
  "Merchant Name",
  "Bank Name",
  "Bank Account Name",
  "Bank Account N0.",
  "Bank Branch Code",
  "No of Routes",
  "Date Created",
];

const SingleTableRow = ({ merchantData }: { merchantData: IMerchantData }) => {
  const router = useRouter();
  return (
    <tr
      className="border-b  group hover:bg-gray-100 whitespace-nowrap cursor-pointer text-gray-600 "
      onClick={() => router.push(`/merchants/${merchantData.externalId}`)}
    >
      <td scope="row" className="px-4 py-2 font-medium  whitespace-nowrap ">
        {merchantData.name}
      </td>
      <td className="px-4 py-2">{merchantData.bankName}</td>
      <td className="px-4 py-2">{merchantData.bankAccountName}</td>
      <td className="px-4 py-2">{merchantData.bankAccountNumber}</td>
      <td className="px-4 py-2">{merchantData.bankBranchCode}</td>
      <td className="px-4 py-2">{merchantData.routes.length}</td>
      <td className="px-4 py-2">{formatDate(merchantData.createdAt)}</td>
    </tr>
  );
};

const MerchantsTable = ({
  isLoadingData,
  merchantsData,
}: MerchantsTableProps) => {
  const [openFilters, setOpenFilters] = useState(true);

  return (
    <section className=" bg-white   border-gray-500 rounded-lg border h-full flex flex-col gap-3 overflow-clip">
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
                  placeholder="search settlements"
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

      {/* main table */}
      <div className="tableWrapper">
        <div className="overflow-auto ">
          <table className="w-full text-sm text-left   table-auto">
            <thead className="sticky top-0 text-xs text-gray-700 uppercase  border-b border-black bg-white ">
              <tr className="">
                {tableHeaders.map((header, _x) => (
                  <th key={_x} scope="col" className="px-4 py-3  ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merchantsData?.map((merchant, _in) => (
                <SingleTableRow key={_in} merchantData={merchant} />
              ))}
            </tbody>
          </table>
        </div>
        {isLoadingData && <TableLoader />}
        {!merchantsData && !isLoadingData && <TableNoDataFound />}

        <TableFooter />
      </div>
    </section>
  );
};

export default MerchantsTable;
