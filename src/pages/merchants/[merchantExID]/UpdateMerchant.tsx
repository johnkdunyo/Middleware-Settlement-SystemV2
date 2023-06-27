import InputComponent from "@/components/uis/InputComponent";
import React, { useState } from "react";
import API from "@/network/api";
import { toast } from "react-toastify";
import { IMerchantDetails } from "@/types/merchant";
import { useRouter } from "next/router";

interface IErrorObject {
  name: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankBranchCode: string;
}

interface IUpdateMerchantProps {
  name: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankBranchCode: string;
  setOpenEditMerchantModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}

const UpdateMerchant = ({
  name,
  bankName,
  bankAccountName,
  bankAccountNumber,
  bankBranchCode,
  setMerchantDetails,
  setOpenEditMerchantModal,
}: IUpdateMerchantProps) => {
  const router = useRouter();
  const merchantExID = router.query.merchantExID;
  const [merchantData, setMerchantData] = useState({
    name: name,
    bankName: bankName,
    bankAccountName: bankAccountName,
    bankAccountNumber: bankAccountNumber,
    bankBranchCode: bankBranchCode,
  });

  const [errorObject, setErrorObject] = useState<IErrorObject>();
  const [formLoadingState, setFormLoadingState] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMerchantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onUpdateMerchantHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoadingState(true);
    API.put(`/merchants/${merchantExID}`, merchantData)
      .then((response) => {
        toast.success("Merchant Updated Successfully");
        setOpenEditMerchantModal(false);
        API.get(`/merchants/${merchantExID}`).then((response) => {
          setMerchantDetails(response.data.data);
        });
      })
      .catch((error) => {
        // console.log(error.response.data);
        setErrorObject(error.response.data.errors);
        toast.error(error.response.data.message || "An error occured");
      })
      .finally(() => setFormLoadingState(false));
  };

  return (
    <form
      className="mt-5 flex flex-col gap-2 "
      onSubmit={onUpdateMerchantHandler}
    >
      <div>
        <InputComponent
          label="Merchant Name"
          name="name"
          type={"text"}
          value={merchantData.name}
          onChange={handleInputChange}
          required
          error={errorObject?.name}
        />
      </div>
      <div className="mt-4">Bank</div>
      <div className="grid gap-6 mb-4 sm:grid-cols-2 ">
        <InputComponent
          label="Account Name"
          name="bankAccountName"
          type={"text"}
          value={merchantData.bankAccountName}
          onChange={handleInputChange}
          required
          error={errorObject?.bankAccountName}
        />
        <InputComponent
          label="Account Number"
          name="bankAccountNumber"
          type={"text"}
          value={merchantData.bankAccountNumber}
          onChange={handleInputChange}
          required
          error={errorObject?.bankAccountNumber}
        />
      </div>

      <div className="grid gap-6 mb-4 sm:grid-cols-2 ">
        <InputComponent
          label="Bank Name"
          name="bankName"
          type={"text"}
          value={merchantData.bankName}
          onChange={handleInputChange}
          required
          error={errorObject?.bankName}
        />
        <InputComponent
          label="Bank Branch Code"
          name="bankBranchCode"
          type={"text"}
          value={merchantData.bankBranchCode}
          onChange={handleInputChange}
          required
          error={errorObject?.bankBranchCode}
        />
      </div>
      <div className="flex justify-end mt-10 pb-2">
        <button
          className="px-6 py-1.5  rounded-lg text-white bg-green-700 hover:bg-green-800"
          type="submit"
        >
          {formLoadingState ? "Updating" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default UpdateMerchant;
