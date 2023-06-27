import Modal from "@/components/modals";
import React, { useState } from "react";
import AddMerchantTerminal from "./AddMerchantTerminal";
import { IMerchant, IMerchantDetails } from "@/types/merchant";
import { ITerminal } from "@/types/terminal";
import TableLoader from "@/components/tables/TableLoader";
import TableNoDataFound from "@/components/tables/TableNoDataFound";
import UpdateMerchantTerminal from "./UpdateMerchantTerminal";

interface MerchantTerminalsTabProps {
  isLoading: boolean;
  merchantTerminals: IMerchant[];
  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}

interface MerchantTerminalCardProps {
  terminal: ITerminal;
  setSelectedTerminal: React.Dispatch<
    React.SetStateAction<ITerminal | undefined>
  >;
  selectedTerminal: ITerminal | undefined;
}

const MerchantTerminalCard = ({
  terminal,
  selectedTerminal,
  setSelectedTerminal,
}: MerchantTerminalCardProps) => {
  return (
    <div
      className={`px-6 flex flex-col gap-1 py-4 ${
        selectedTerminal?.externalId === terminal.externalId
          ? "bg-gray-200"
          : "bg-white border-gray-300"
      }  border  hover:bg-gray-200 rounded-lg text-black cursor-pointer`}
      onClick={() => setSelectedTerminal && setSelectedTerminal(terminal)}
    >
      <div>
        <span className="text-blue-900">name:</span> {terminal.name}
      </div>

      <div>
        <span className="text-blue-900">Created at:</span> Thu Jun 15 2023,
        10:46:20
      </div>
    </div>
  );
};

interface SingleTableRowProps {
  title: string;
  value: string;
  isCurrency?: boolean;
}

const SingleTableRow = ({
  title,
  value,
  isCurrency = false,
}: SingleTableRowProps) => {
  return (
    <tr className="border-b hover:bg-gray-50 text-gray-800 ">
      <td className="px-6 py-1">{title}</td>
      <td>
        {isCurrency && "GHS "}
        {value}
      </td>
    </tr>
  );
};
const MerchantTerminalsTab = ({
  isLoading,
  merchantTerminals,
  setMerchantDetails,
}: MerchantTerminalsTabProps) => {
  const [openAddMerchantTerminalModal, setOpenAddMerchantTerminalModal] =
    useState(false);

  const [openUpdateMerchantTerminalModal, setOpenUpdateMerchantTerminalModal] =
    useState(false);

  const [selectedTerminal, setSelectecTerminal] = useState<
    ITerminal | undefined
  >(
    merchantTerminals?.length > 0
      ? merchantTerminals && merchantTerminals[0]
      : undefined
  );

  return (
    <div className="h-full  w-full flex flex-col overflow-clip gap-4">
      {/* top row */}
      <div className="w-full  border-b pb-2  flex justify-between items-center px-3 pt-2.5">
        <form className="flex items-center px-2    gap-4  w-full">
          <div className="w-full">
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
                placeholder="by name, bankName, bankAccountName ..."
              />
            </div>
          </div>

          {/* search filters */}
          <div className="  flex justify-end gap-4">
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

        <div className="w-full flex justify-end">
          <button
            onClick={() => setOpenAddMerchantTerminalModal(true)}
            type="button"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800  font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 "
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add Merchant Terminal
          </button>
        </div>
      </div>

      <div className="w-full flex  h-[48vh] xl:h-[40vh] 2xl:h-[52vh] justify-between gap-10 px-3">
        <div className="   h-full flex flex-col gap-5  px-2 w-2/5 overflow-scroll">
          {merchantTerminals &&
            merchantTerminals.map((terminal, _x) => (
              <MerchantTerminalCard
                key={_x}
                terminal={terminal}
                selectedTerminal={selectedTerminal}
                setSelectedTerminal={setSelectecTerminal}
              />
            ))}
          {merchantTerminals &&
            merchantTerminals.length === 0 &&
            !isLoading && <TableNoDataFound title="merchants" />}
          {isLoading && <TableLoader showBackground={false} />}
        </div>

        {selectedTerminal && (
          <div className="w-3/5  h-full flex flex-col justify-between  bg-[#f3f4f6] border border-gray-200 rounded-lg text-black">
            <div className=" border-b px-3 pt-2 h-10 ">
              <h1 className="text-blue-900 font-medium">Terminal Details</h1>
            </div>

            <div className="flex flex-col justify-between h-full overflow-scroll">
              <div className=" px-3   mt-6">
                <table className="table-auto w-full text-base  ">
                  <thead></thead>
                  <tbody>
                    <SingleTableRow
                      title="name"
                      value={selectedTerminal?.name || ""}
                    />
                    <SingleTableRow
                      title="bankName"
                      value={selectedTerminal?.bankName || ""}
                    />
                    <SingleTableRow
                      title="bankAccountName"
                      value={selectedTerminal?.bankAccountName || ""}
                    />
                    <SingleTableRow
                      title="bankAccountNumber"
                      value={selectedTerminal?.bankAccountNumber || ""}
                    />
                    <SingleTableRow
                      title="bankBranchCode"
                      value={selectedTerminal?.bankBranchCode || ""}
                    />
                    <SingleTableRow title="Date Created" value="10/10/2020" />
                  </tbody>
                </table>
              </div>
            </div>
            <div className=" border-t w-full  flex justify-between px-3 py-3 text-sm  text-white">
              <button
                className="px-3 py-1.5 rounded-lg  bg-green-500 hover:bg-green-600"
                onClick={() => setOpenUpdateMerchantTerminalModal(true)}
              >
                Update Terminal
              </button>
              <button className="px-3 py-1.5 rounded-lg  bg-red-700 hover:bg-red-800">
                Delete Terminal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* add merchant terminal modal */}
      <Modal
        open={openAddMerchantTerminalModal}
        onClose={() => setOpenAddMerchantTerminalModal(false)}
        title="Add New Merchant Terminal"
        dialogWrapperClass="w-1/2 md:w-[40%] p-6"
      >
        <AddMerchantTerminal
          setMerchantDetails={setMerchantDetails}
          setOpenAddMerchantTerminalModal={setOpenAddMerchantTerminalModal}
        />
      </Modal>

      <Modal
        open={openUpdateMerchantTerminalModal}
        onClose={() => setOpenUpdateMerchantTerminalModal(false)}
        title="Update Merchant Terminal"
        dialogWrapperClass="w-1/2 md:w-[40%] p-6"
      >
        <UpdateMerchantTerminal
          terminal={selectedTerminal!}
          setMerchantDetails={setMerchantDetails}
          setOpenUpdateMerchantTerminalModal={
            setOpenUpdateMerchantTerminalModal
          }
        />
      </Modal>
    </div>
  );
};

export default MerchantTerminalsTab;
