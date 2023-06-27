import InputComponent from "@/components/uis/InputComponent";
import { IMerchant, IMerchantDetails } from "@/types/merchant";
import { ITerminal } from "@/types/terminal";
import React, { useState } from "react";
import API from "@/network/api";
import { error } from "console";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface UpdateMerchantTerminalProps {
  terminal: ITerminal;
  setOpenUpdateMerchantTerminalModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}

const UpdateMerchantTerminal = ({ terminal }: UpdateMerchantTerminalProps) => {
  const router = useRouter();
  const merchantExID = router.query.merchantExID;
  if (!merchantExID) return;
  const [formLoadingState, setFormLoadingState] = useState(false);
  const [newMerchant, setNewMerchant] = useState<ITerminal>({
    externalId: terminal.externalId,
    name: terminal.name,
    bankName: terminal.bankName,
    bankAccountName: terminal.bankAccountName,
    bankAccountNumber: terminal.bankAccountNumber,
    bankBranchCode: terminal.bankBranchCode,
  });

  const [errorObject, setErrorObject] = useState<IMerchant | undefined>();

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

  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoadingState(true);
    API.put(`/terminals/${newMerchant.externalId}`, newMerchant)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorObject(error.response.data.errors);
        toast.error(error.response.data.message);
      })
      .finally(() => setFormLoadingState(false));
  };

  return (
    <form onSubmit={onSubmitFormHandler}>
      <div>
        <InputComponent
          label="Name"
          name="name"
          type={"text"}
          value={newMerchant.name}
          required
          onChange={handleInputChange}
          placeHolder="Please enter terminal's name"
          error={errorObject?.name}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputComponent
          label="Bank Account Name"
          name="bankAccountName"
          type={"text"}
          value={newMerchant.bankAccountName}
          required
          onChange={handleInputChange}
          placeHolder="Please enter Bank Account's name"
          error={errorObject?.bankAccountName}
        />

        <InputComponent
          label="Bank Account Number"
          name="bankAccountNumber"
          type={"text"}
          value={newMerchant.bankAccountNumber}
          required
          onChange={handleInputChange}
          placeHolder="Please enter bank account's number"
          error={errorObject?.bankAccountNumber}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputComponent
          label="Bank Name"
          name="bankName"
          type={"text"}
          value={newMerchant.bankName}
          required
          onChange={handleInputChange}
          placeHolder="Please enter bank's name"
          error={errorObject?.bankName}
        />

        <InputComponent
          label="Bank Branch Code"
          name="bankBranchCode"
          type={"text"}
          value={newMerchant.bankBranchCode}
          required
          onChange={handleInputChange}
          placeHolder="Please enter branch's ncode"
          error={errorObject?.bankBranchCode}
        />
      </div>

      <div className="flex justify-end mt-10 pb-2">
        <button
          className="px-6 py-1.5  rounded-lg text-white bg-green-700 hover:bg-green-800"
          type="submit"
        >
          {formLoadingState ? "Updating" : "update"}
        </button>
      </div>
    </form>
  );
};

export default UpdateMerchantTerminal;
