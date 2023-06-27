import InputComponent from "@/components/uis/InputComponent";
import { INewRouteErrorObject, IRoute } from "@/types/route";
import React, { useState } from "react";
import API from "@/network/api";

import { toast } from "react-toastify";
import { IMerchantDetails } from "@/types/merchant";
import { useRouter } from "next/router";

interface INewMerchantRoute {
  percentageFee: number;
  minCapAmount: number;
  minCapAmountFee: number;
  maxCapAmount: number;
  maxCapAmountFee: number;
}

interface UpdateMerchantRouteProps {
  setOpenEditMerchantModal: React.Dispatch<React.SetStateAction<boolean>>;
  route: IRoute;
  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}

const UpdateMerchantRoute = ({
  setOpenEditMerchantModal,
  route,
  setMerchantDetails,
}: UpdateMerchantRouteProps) => {
  const router = useRouter();
  const merchantExID = router.query.merchantExID;
  const [formLoadingState, setFormLoadingState] = useState(false);
  const [newMerchantRoute, setNewMerchantRoute] = useState<INewMerchantRoute>({
    percentageFee: route.percentageFee,
    maxCapAmount: route.maxCapAmount,
    maxCapAmountFee: route.maxCapAmountFee,
    minCapAmount: route.minCapAmount,
    minCapAmountFee: route.minCapAmountFee,
  });

  const [errorObject, setErrorObject] = useState<
    INewRouteErrorObject | undefined
  >();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMerchantRoute((prevData) => ({
      ...prevData,
      [name]: Number(value),
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
    API.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/merchants/${merchantExID}/routes/${route.externalId}`,
      newMerchantRoute
    )
      .then((_response) => {
        toast.success("Merchant Route Updated");
        // update state
        API.get(`/merchants/${merchantExID}`).then((response) => {
          setMerchantDetails(response.data.data);
          console.log(response.data.data);
        });
        setOpenEditMerchantModal(false);
      })
      .catch((error) => {
        setErrorObject(error.response.data.errors);
        toast.error(error.response.data.message || "An error occured");
      })
      .finally(() => setFormLoadingState(false));
  };

  return (
    <form onSubmit={onSubmitFormHandler}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputComponent
          label="Min Cap Amount"
          name="minCapAmount"
          type={"number"}
          value={newMerchantRoute.minCapAmount}
          placeHolder="please enter route's min cap amout"
          required
          onChange={handleInputChange}
          error={errorObject?.minCapAmount}
        />
        <InputComponent
          label="Min Cap Amount Fee"
          name="minCapAmountFee"
          type={"number"}
          value={newMerchantRoute.minCapAmountFee}
          placeHolder="please enter route's min cap amout"
          required
          onChange={handleInputChange}
          error={errorObject?.minCapAmountFee}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputComponent
          label="Max Cap Amount"
          name="maxCapAmount"
          type={"number"}
          value={newMerchantRoute.maxCapAmount}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
          error={errorObject?.maxCapAmount}
        />
        <InputComponent
          label="Max Cap Amount Fee"
          name="maxCapAmountFee"
          type={"number"}
          value={newMerchantRoute.maxCapAmountFee}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
          error={errorObject?.maxCapAmountFee}
        />
      </div>

      <div className="mt-6">
        <InputComponent
          label="Percentage Fee"
          name="percentageFee"
          type={"number"}
          value={newMerchantRoute.percentageFee}
          placeHolder="please enter the percentage fee"
          required
          onChange={handleInputChange}
          error={errorObject?.percentageFee}
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

export default UpdateMerchantRoute;
