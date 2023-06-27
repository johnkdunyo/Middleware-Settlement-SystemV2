"use client";

import TableFooter from "@/components/tables/TableFooter";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/network/api";
import { ISettlement } from "@/types/settlement";
import TableNoDataFound from "./TableNoDataFound";
import TableLoader from "./TableLoader";
import { IPageMeta } from "@/types/pageMeta";
import { formatDate } from "@/utils/formatDate";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import formatCurrency from "@/utils/formatCurrency";

const tableHeaders = [
  "Transaction Count",
  "Transaction Value",
  "Amout Payable",
  "Gross Commission",
  "Net Commission",
  "Processor Commission",
  "Routes Count",
  "MTN Cost",
  "Vodafone Cash Cost",
  "AT Cash Cost",
  "Status",
];

interface ISingleTableRowProps {
  settlement: ISettlement;
}

const SingleTableRow = ({ settlement }: ISingleTableRowProps) => {
  const router = useRouter();

  console.log(settlement);

  return (
    <tr
      className="border-b  group hover:bg-gray-100 whitespace-nowrap cursor-pointer text-gray-600 "
      onClick={() => router.push(`/settlements/${settlement.externalId}`)}
    >
      <td className="px-4 py-2">{settlement.transactionCount}</td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.transactionValue))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.amountPayable))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.grossCommission))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.netCommission))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.processorCommission))}
      </td>
      <td className="px-4 py-2">{settlement.routeCount}</td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.mtnCost))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.vodafoneCashCost))}
      </td>
      <td className="px-4 py-2">
        {formatCurrency(Number(settlement.atmoneyCost))}
      </td>
      <td className=" rounded-md text-white py-2 ">
        <p className="bg-green-400 px-2 py-1 rounded-[20px] text-center">
          {settlement.status}
        </p>
      </td>
    </tr>
  );
};

const SettlementsTable = () => {
  const [openFilters, setOpenFilters] = useState(true);
  const [allSettlements, setAllSettlements] = useState<ISettlement[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [pageMeta, setPageMeta] = useState<IPageMeta>();
  const [url, setUrl] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}/settlements`
  );

  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  const handleClearForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/settlements`);
    setDateValue({
      startDate: null,
      endDate: null,
    });
  };

  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dateValue.startDate === null && dateValue.endDate === null) return;
    setUrl(
      `${process.env.NEXT_PUBLIC_BASE_URL}/settlements?from=${dateValue.startDate}&to=${dateValue.endDate}`
    );
  };

  useEffect(() => {
    setIsLoading(true);
    API.get(url)
      .then((response) => {
        setAllSettlements(response.data.data);
        setPageMeta(response.data.meta);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occured");
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return (
    <section className=" bg-white  rounded-lg border h-full flex flex-col gap-3 overflow-clip">
      {openFilters && (
        <div className="w-full border-b  ">
          <form
            className="flex items-center p-3 pb-1.5 w-full gap-4"
            onSubmit={onFormSubmitHandler}
          >
            <div className="w-1/3">
              <Datepicker
                inputClassName="w-full rounded-md focus:ring-0 font-normal bg-green-100 dark:bg-white dark:placeholder:text-gray-600 border border-gray-600 py-1.5 px-2"
                separator={"to"}
                value={dateValue}
                onChange={handleValueChange}
                showShortcuts={true}
              />
            </div>

            {/* search filters */}
            <div className="w-3/4  flex justify-end gap-4">
              <button
                className=" w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium border rounded-lg hover:bg-gray-100 hover:text-primary-600"
                onClick={handleClearForm}
              >
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
              {allSettlements?.map((settlement, _x) => (
                <SingleTableRow key={_x} settlement={settlement} />
              ))}
            </tbody>
          </table>
        </div>

        {isLoading && <TableLoader showBackground={false} />}
        {!allSettlements && !isLoading && (
          <TableNoDataFound title="Settlement" />
        )}

        <TableFooter />
      </div>
    </section>
  );
};

export default SettlementsTable;
