"use client";

import Modal from "@/components/modals";
import InputComponent from "@/components/uis/InputComponent";
import React, { ChangeEvent, useEffect, useState } from "react";
import API from "@/network/api";
import { toast } from "react-toastify";
import { IMerchantData } from "@/types/merchant";

interface AddMerchantProps {
  setMerchantsData: React.Dispatch<
    React.SetStateAction<IMerchantData[] | undefined>
  >;
}
interface IMerchant {
  name: string;
  nickname: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankBranchCode: string;
}

const AddMerchant = ({ setMerchantsData }: AddMerchantProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newMerchant, setNewMerchant] = useState<IMerchant>({
    name: "",
    nickname: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
    bankBranchCode: "",
  });

  const [errorObject, setErrorObject] = useState<IMerchant | undefined>();

  const onAddMerchantHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorObject(undefined);
    setIsAdding(true);
    API.post("/merchants", newMerchant)
      .then((response) => {
        if (response.status === 200) {
          setOpenModal(false);
          toast.success("Merchant Created Successfully");
          setNewMerchant({
            name: "",
            nickname: "",
            bankName: "",
            bankAccountNumber: "",
            bankAccountName: "",
            bankBranchCode: "",
          });

          // fetch merchants
          API.get(`/merchants`).then((res) => {
            setMerchantsData(res.data.data);
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setErrorObject(error.response.data.errors);
        console.log(error.response.data);
      })
      .finally(() => setIsAdding(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMerchant((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrorObject((prevError) => {
      if (prevError) {
        return {
          ...prevError,
          [name]: undefined,
        };
      }
      return prevError;
    });
  };

  // clear data when modal is closed
  useEffect(() => {
    setNewMerchant({
      name: "",
      nickname: "",
      bankName: "",
      bankAccountNumber: "",
      bankAccountName: "",
      bankBranchCode: "",
    });
  }, [openModal]);

  return (
    <section>
      <div className="w-full pb-1.5    flex justify-end border-b ">
        <div>
          <button
            onClick={() => setOpenModal(true)}
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
            Add Merchants
          </button>
        </div>
      </div>

      {/* create settlement modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Add New Merchant"
        dialogWrapperClass="w-4/5 md:w-2/5"
      >
        <form
          onSubmit={onAddMerchantHandler}
          className="mt-5 flex flex-col gap-2 px-6"
        >
          <div className="flex flex-col gap-6">
            <InputComponent
              label="Merchant Name"
              name="name"
              type={"text"}
              placeHolder=""
              value={newMerchant.name}
              onChange={handleInputChange}
              error={errorObject?.name}
              required
            />
            <InputComponent
              label="Merchant Nick Name"
              name="nickname"
              type={"text"}
              placeHolder=""
              value={newMerchant.nickname}
              onChange={handleInputChange}
              error={errorObject?.nickname}
              required
            />
          </div>
          <div className="mt-4">Bank</div>
          <div className="grid gap-6 mb-4 sm:grid-cols-2 ">
            <InputComponent
              label="Account Name"
              name="bankAccountName"
              type={"text"}
              placeHolder=""
              value={newMerchant.bankAccountName}
              onChange={handleInputChange}
              error={errorObject?.bankAccountName}
              required
            />
            <InputComponent
              label="Account Number"
              name="bankAccountNumber"
              type={"text"}
              placeHolder=""
              value={newMerchant.bankAccountNumber}
              onChange={handleInputChange}
              error={errorObject?.bankAccountNumber}
              required
            />
          </div>

          <div className="grid gap-6 mb-4 sm:grid-cols-2 ">
            <InputComponent
              label="Bank Name"
              name="bankName"
              type={"text"}
              placeHolder=""
              value={newMerchant.bankName}
              onChange={handleInputChange}
              error={errorObject?.bankName}
              required
            />
            <InputComponent
              label="Bank Branch Code"
              name="bankBranchCode"
              type={"text"}
              placeHolder=""
              value={newMerchant.bankBranchCode}
              onChange={handleInputChange}
              error={errorObject?.bankBranchCode}
              required
            />
          </div>
          <div className="flex justify-end mt-10 pb-2">
            <button
              className="px-6 py-1.5  rounded-lg text-white bg-green-700 hover:bg-green-800"
              type="submit"
            >
              {isAdding ? "Adding" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default AddMerchant;
