import InputComponent from "@/components/uis/InputComponent";
import React, { useState } from "react";
import API from "@/network/api";
import { toast } from "react-toastify";
import { IServerRoute } from "@/types/route";

interface AddRouteProps {
  setOpenAddRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRoutes: React.Dispatch<React.SetStateAction<IServerRoute[] | undefined>>;
}

const AddRoute = ({ setOpenAddRouteModal, setRoutes }: AddRouteProps) => {
  const [formLoadingState, setFormLoadingState] = useState(false);
  const [route, setRoute] = useState({
    name: "",
    rSwitch: "",
    percentageFee: 0,
    minCapAmount: 0,
    minCapAmountFee: 0,
    maxCapAmount: 0,
    maxCapAmountFee: 0,
    defaultMaxCapAmount: 0,
    defaultMaxCapAmountFee: 0,
    defaultMinCapAmount: 0,
    defaultMinCapAmountFee: 0,
    defaultPercentageFee: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoute((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFormSubmitHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoadingState(true);
    API.post(`/routes`, route)
      .then((response) => {
        // console.log(response);
        setOpenAddRouteModal(false);
        toast.success("Route Added successfully");
        // update state
        API.get(`/routes`).then((response) => {
          // console.log(response.data.data);
          setRoutes(response.data.data);
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An error occured");
      })
      .finally(() => setFormLoadingState(false));
  };

  return (
    <form className="w-full mt-10" onSubmit={onFormSubmitHandler}>
      <div className="grid grid-cols-2 mt-6 border-b pb-2 gap-6">
        <InputComponent
          label="Name"
          name="name"
          type={"text"}
          value={route.name}
          placeHolder="please enter route's name"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="rSwitch"
          name="rSwitch"
          type={"text"}
          value={route.rSwitch}
          placeHolder="please enter route's rSwitch"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
        <InputComponent
          label="Min Cap Amount"
          name="minCapAmount"
          type={"number"}
          value={String(route.minCapAmount)}
          placeHolder="please enter route's min cap amout"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="Default Min Cap Amount"
          name="defaultMinCapAmount"
          type={"number"}
          value={String(route.defaultMinCapAmount)}
          placeHolder="please enter route's min cap amout"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 border-b  pb-2">
        <InputComponent
          label="Min Cap Amount Fee"
          name="minCapAmountFee"
          type={"number"}
          value={String(route.minCapAmountFee)}
          placeHolder="please enter route's min cap amout"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="Default Min Cap Amount Fee"
          name="defaultMinCapAmountFee"
          type={"number"}
          value={String(route.defaultMinCapAmountFee)}
          placeHolder="please enter route's min cap amout"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputComponent
          label="Max Cap Amount"
          name="maxCapAmount"
          type={"number"}
          value={String(route.maxCapAmount)}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="Default Max Cap Amount"
          name="defaultMaxCapAmount"
          type={"number"}
          value={String(route.defaultMaxCapAmount)}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 border-b pb-2">
        <InputComponent
          label="Max Cap Amount Fee"
          name="maxCapAmountFee"
          type={"number"}
          value={String(route.maxCapAmountFee)}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="Default Max Cap Amount Fee"
          name="defaultMaxCapAmountFee"
          type={"number"}
          value={String(route.defaultMaxCapAmountFee)}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <InputComponent
          label="Percentage Fee"
          name="percentageFee"
          type={"number"}
          value={String(route.percentageFee)}
          placeHolder="please enter the percentage fee"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="DeafultPercentage Fee"
          name="defaultPercentageFee"
          type={"number"}
          value={String(route.defaultPercentageFee)}
          placeHolder="please enter the percentage fee"
          required
          onChange={handleInputChange}
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

export default AddRoute;
