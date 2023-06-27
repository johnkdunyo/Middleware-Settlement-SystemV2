import SelectMenuComponent from "@/components/uis/SelectMenuComponent";
import React, { useEffect, useState } from "react";
import API from "@/network/api";
import { error } from "console";
import { INewRoute, INewRouteErrorObject, IServerRoute } from "@/types/route";
import InputComponent from "@/components/uis/InputComponent";

import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { IMerchantDetails, INewMerchant } from "@/types/merchant";

const AddMerchantRoute = ({
  setOpenAddMerchantRouteModal,
  setMerchantDetails,
}: {
  setOpenAddMerchantRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}) => {
  const params = useParams();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [formLoadingState, setFormLoadingState] = useState(false);
  const [allRoutes, setAllRoutes] = useState<IServerRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<IServerRoute>();

  const [newMerchantRoute, setNewMerchantRoute] = useState<INewRoute>({
    routeExternalId: selectedRoute?.externalId!,
    maxCapAmount: 0.0,
    maxCapAmountFee: 0.0,
    minCapAmount: 0.0,
    minCapAmountFee: 0.0,
    percentageFee: 0.0,
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

  //   load all routes
  useEffect(() => {
    setIsLoadingState(true);
    API.get(`/routes`)
      .then((response) => {
        // console.log(response.data.data);
        setAllRoutes(response.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoadingState(false);
      });
  }, []);

  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorObject(undefined);
    setFormLoadingState(true);
    console.log(newMerchantRoute);
    API.post(`/merchants/${params.merchantExID}/routes`, newMerchantRoute)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setOpenAddMerchantRouteModal(false);
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

  useEffect(() => {
    setNewMerchantRoute((prevData) => ({
      ...prevData,
      routeExternalId: selectedRoute?.externalId!,
    }));
  }, [selectedRoute]);

  return (
    <>
      <form
        onSubmit={onSubmitFormHandler}
        className="mt-5 flex flex-col gap-4 w-full"
      >
        <div className="h-20">
          {isLoadingState ? (
            <div>Loading all routes</div>
          ) : (
            <SelectMenuComponent<IServerRoute>
              title="Select Route"
              dataArray={allRoutes}
              setSelectedData={setSelectedRoute}
            />
          )}
        </div>

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
            {formLoadingState ? "Adding" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddMerchantRoute;
