import InputComponent from "@/components/uis/InputComponent";
import { IMerchantDetails, INewMerchant } from "@/types/merchant";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import API from "@/network/api";
import { toast } from "react-toastify";

interface AddMerchantTerminalProps {
  setOpenAddMerchantTerminalModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}

const AddMerchantTerminal = ({
  setOpenAddMerchantTerminalModal,
  setMerchantDetails,
}: AddMerchantTerminalProps) => {
  const params = useParams();
  const [formLoadingState, setFormLoadingState] = useState(false);
  const [newMerchant, setNewMerchant] = useState<INewMerchant>({
    merchantExternalId: params.merchantExID,
    name: "",
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankBranchCode: "",
  });

  const [errorObject, setErrorObject] = useState<INewMerchant | undefined>();

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
    setErrorObject(undefined);
    setFormLoadingState(true);
    API.post(`/terminals`, newMerchant)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setOpenAddMerchantTerminalModal(false);
          // update state
          API.get(`/merchants/${params.merchantExID}`).then((response) => {
            setMerchantDetails(response.data.data);
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorObject(error.response.data.errors);
        toast.error(error.response.data.message || "An error occured");
      })
      .finally(() => setFormLoadingState(false));
  };

  return (
    <form className="w-full mt-6" onSubmit={onSubmitFormHandler}>
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
          {formLoadingState ? "Adding" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddMerchantTerminal;
