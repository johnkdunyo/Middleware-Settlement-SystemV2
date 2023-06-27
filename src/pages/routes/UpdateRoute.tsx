import InputComponent from "@/components/uis/InputComponent";
import { IServerRoute } from "@/types/route";
import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "@/network/api";
import { usePathname } from "next/navigation";

interface UpdateRouteProps {
  route: IServerRoute;
  setOpenUpdateRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRoute = ({ setOpenUpdateRouteModal, route }: UpdateRouteProps) => {
  const pathName = usePathname();
  const [formLoadingState, setFormLoadingState] = useState(false);
  const [updatedRoute, setUpdatedRoute] = useState({
    percentageFee: route.percentageFee,
    maxCapAmount: route.maxCapAmount,
    maxCapAmountFee: route.maxCapAmountFee,
    minCapAmount: route.minCapAmount,
    minCapAmountFee: route.minCapAmountFee,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedRoute((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoadingState(true);
    API.put(`/routes/${route.externalId}`, updatedRoute)
      .then((response) => {
        toast.success(" Route Updated");
        setOpenUpdateRouteModal(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message || "An error occured");
      })
      .finally(() => setFormLoadingState(false));
  };

  console.log("pathName", pathName);

  return (
    <form className="w-full mt-10" onSubmit={onSubmitFormHandler}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputComponent
          label="Min Cap Amount"
          name="minCapAmount"
          type={"number"}
          value={String(updatedRoute.minCapAmount)}
          placeHolder="please enter route's min cap amout"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="Min Cap Amount Fee"
          name="minCapAmountFee"
          type={"number"}
          value={String(updatedRoute.minCapAmountFee)}
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
          value={String(updatedRoute.maxCapAmount)}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
        />
        <InputComponent
          label="Max Cap Amount Fee"
          name="maxCapAmountFee"
          type={"number"}
          value={String(updatedRoute.maxCapAmountFee)}
          placeHolder="please enter route's max cap amout"
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-6">
        <InputComponent
          label="Percentage Fee"
          name="percentageFee"
          type={"number"}
          value={String(updatedRoute.percentageFee)}
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

export default UpdateRoute;
