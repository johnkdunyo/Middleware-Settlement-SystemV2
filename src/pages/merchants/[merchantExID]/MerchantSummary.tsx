import DataCardComponent from "@/components/cards/DataCardComponent";
import Modal from "@/components/modals";
import InputComponent from "@/components/uis/InputComponent";
import { type } from "os";
import React, { useEffect, useRef, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import UpdateMerchant from "./UpdateMerchant";
import { IMerchantDetails } from "@/types/merchant";

interface MerchantSummaryProps {
  merchantName: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  dateCreated: string;
  bankBranchCode: string;
  terminalsCount: number;
  routesCount: number;

  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}

const MerchantSummary = ({
  merchantName,
  bankName,
  bankAccountName,
  bankAccountNumber,
  dateCreated,
  bankBranchCode,
  terminalsCount,
  routesCount,
  setMerchantDetails,
}: MerchantSummaryProps) => {
  const [openMerchantSummaryMenu, setOpenMerchantSummaryMenu] = useState(false);
  const merchantSummaryMenuRef = useRef<HTMLDivElement>(null);

  const [openEditMerchantModal, setOpenEditMerchantModal] = useState(false);

  useEffect(() => {
    let clickHandler = (e: any) => {
      if (!merchantSummaryMenuRef.current?.contains(e.target)) {
        setOpenMerchantSummaryMenu(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  });

  const onClickEditHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMerchantSummaryMenu(false);
    setOpenEditMerchantModal(true);
  };

  return (
    <section className="flex  justify-between w-full h-[17vh]  ">
      <div className="w-full flex justify-between   gap-10">
        <div className="  w-8/12 flex  bg-white border border-gray-500 rounded-lg p-2 text-sm items-end relative">
          <table className="w-[45%] table-auto">
            <thead></thead>
            <tbody className=" ">
              <tr className="">
                <td className=""> Name</td>
                <td className="text-[#2e4792] ">{merchantName}</td>
              </tr>

              <tr className="">
                <td>CreatedAt</td>
                <td className="text-[#2e4792]  whitespace-nowrap ">
                  {dateCreated}
                </td>
              </tr>
            </tbody>
          </table>

          <table className=" w-full table-auto">
            <thead></thead>
            <tbody>
              <tr className="whitespace-nowrap">
                <td className="whitespace-pre overflow-scroll">Bank Name</td>
                <td className="text-[#2e4792]  whitespace-pre overflow-scroll">
                  {bankName}
                </td>
              </tr>
              <tr className="">
                <td>Bank Account Name</td>
                <td className="text-[#2e4792] ">{bankAccountName}</td>
              </tr>
              <tr className="">
                <td>Bank Account Number</td>
                <td className="text-[#2e4792] ">{bankAccountNumber}</td>
              </tr>
              <tr className="">
                <td>Bank Branch Code</td>
                <td className="text-[#2e4792] ">{bankBranchCode}</td>
              </tr>
            </tbody>
          </table>
          <div className="absolute inset-0 w-full h-full p-1 ">
            <div className="h-full  flex flex-col items-end gap-1 ">
              <div>
                <button
                  className="rounded-full border hover:bg-gray-200 px-2 py-2"
                  onClick={() => setOpenMerchantSummaryMenu(true)}
                >
                  <CgMenuRightAlt color="blue" />
                </button>
              </div>
              {openMerchantSummaryMenu && (
                <div
                  ref={merchantSummaryMenuRef}
                  className="w-1/5 h-full border bg-gray-100 border-gray-300  rounded-lg flex flex-col justify-center divide-y text-gray-700"
                >
                  <button
                    className="px-2 hover:bg-gray-200 py-1.5 flex items-center gap-2.5 ml-1 "
                    onClick={onClickEditHandler}
                  >
                    <FiEdit size={16} />
                    Edit
                  </button>
                  <button className="px-2 hover:bg-gray-200 py-1.5 flex  items-center gap-2">
                    <MdOutlineDeleteForever size={20} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" gap-2 w-4/12 grid grid-cols-2">
          <DataCardComponent title="Total Routes" value={routesCount} />
          <DataCardComponent title="Total Terminals " value={terminalsCount} />
        </div>
      </div>

      <Modal
        onClose={() => setOpenEditMerchantModal(false)}
        open={openEditMerchantModal}
        title="Update Merchant"
        dialogWrapperClass="w-3/5 "
      >
        <UpdateMerchant
          name={merchantName}
          bankAccountName={bankAccountName}
          bankName={bankName}
          bankBranchCode={bankBranchCode}
          bankAccountNumber={bankAccountNumber}
          setOpenEditMerchantModal={setOpenEditMerchantModal}
          setMerchantDetails={setMerchantDetails}
        />
      </Modal>
    </section>
  );
};

export default MerchantSummary;
