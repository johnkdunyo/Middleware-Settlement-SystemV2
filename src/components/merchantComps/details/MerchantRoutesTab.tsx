import Modal from "@/components/modals";
import TableLoader from "@/components/tables/TableLoader";
import { IRoute } from "@/types/route";
import React, { useState } from "react";
import AddMerchantRoute from "./AddMerchantRoute";
import TableNoDataFound from "@/components/tables/TableNoDataFound";
import UpdateMerchantRoute from "./UpdateMerchantRoute";
import { IMerchantDetails } from "@/types/merchant";

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

const MerchantRouteCard = ({
  route,
  setSelectedRoute,
  selectedRoute,
}: {
  route: IRoute;
  setSelectedRoute: React.Dispatch<React.SetStateAction<IRoute | undefined>>;
  selectedRoute: IRoute | undefined;
}) => {
  return (
    <div
      className={`px-6 flex flex-col gap-1 py-4 ${
        selectedRoute?.externalId === route.externalId
          ? "bg-gray-200"
          : "bg-white border-gray-300"
      }  border  hover:bg-gray-200 rounded-lg text-black cursor-pointer`}
      onClick={() => setSelectedRoute && setSelectedRoute(route)}
    >
      <div>
        <span className="text-blue-900">name:</span> {route.name}
      </div>
      <div>
        <span className="text-blue-900">rSwitch:</span> {route.rSwitch}
      </div>
      <div>
        <span className="text-blue-900">Created at:</span> Thu Jun 15 2023,
        10:46:20
      </div>
    </div>
  );
};

const RouteDetails = ({
  route,
  setOpenEditMerchantModal,
}: {
  route: IRoute;
  setOpenEditMerchantModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-3/5  h-full flex flex-col justify-between  bg-[#f3f4f6] border border-gray-200 rounded-lg text-black ">
      <div className=" border-b px-3 pt-2 h-10">
        <h1 className="text-blue-900 font-medium">Route Details</h1>
      </div>

      <div className="flex flex-col justify-between h-full overflow-scroll">
        <div className=" px-3   mt-6">
          <table className="table-auto w-full text-base  ">
            <thead></thead>
            <tbody>
              <SingleTableRow title="name" value={route?.name!} />
              <SingleTableRow title="rSwitch" value={route?.rSwitch} />
              <SingleTableRow
                title="minCapAmount"
                value={String(route?.minCapAmount)}
                isCurrency={true}
              />
              <SingleTableRow
                title="minCapAmountFee"
                value={String(route?.minCapAmountFee)}
                isCurrency={true}
              />
              <SingleTableRow
                title="maxCapAmount"
                value={String(route?.maxCapAmount)}
                isCurrency={true}
              />
              <SingleTableRow
                title="maxCapAmountFee"
                value={String(route?.maxCapAmountFee)}
                isCurrency={true}
              />
              <SingleTableRow
                title="percentageFee"
                value={String(route?.percentageFee)}
              />
              <SingleTableRow title="Date Created" value="10/10/2020" />
            </tbody>
          </table>
        </div>
      </div>
      <div className=" border-t w-full  flex justify-between px-3 py-3 text-sm  text-white">
        <button
          className="px-3 py-1.5 rounded-lg  bg-green-500 hover:bg-green-600"
          onClick={() => setOpenEditMerchantModal(true)}
        >
          Update Route
        </button>
        <button className="px-3 py-1.5 rounded-lg  bg-red-700 hover:bg-red-800">
          Delete Route
        </button>
      </div>
    </div>
  );
};

const MerchantRoutesTab = ({
  merchantRoutes,
  isLoading,
  setMerchantDetails,
}: {
  merchantRoutes: IRoute[] | undefined;
  isLoading: boolean;
  setMerchantDetails: React.Dispatch<
    React.SetStateAction<IMerchantDetails | undefined>
  >;
}) => {
  // const [selectedRoute, setSelectedRoute] = useState<IRoute>(merchantRoutes[0]);
  const [selectedRoute, setSelectedRoute] = useState<IRoute | undefined>(
    merchantRoutes?.length! > 0
      ? merchantRoutes && merchantRoutes[0]
      : undefined
  );

  const [openAddMerchantRouteModal, setOpenAddMerchantRouteModal] =
    useState(false);
  const [openEditMerchantModal, setOpenEditMerchantModal] = useState(false);

  return (
    <div className="h-full  w-full flex flex-col overflow-clip gap-4">
      {/* top row */}
      <div className="w-full  border-b pb-2  flex justify-end  px-3 pt-2.5">
        <div className="">
          <button
            onClick={() => setOpenAddMerchantRouteModal(true)}
            type="button"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800  font-medium rounded-lg text-sm px-3 py-2 2xl:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 "
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
            Add Merchant Route
          </button>
        </div>
      </div>
      <div className="w-full flex h-[48vh] xl:h-[40vh] 2xl:h-[52vh] justify-between gap-10 px-3  border-blue-600">
        <div className="   h-full flex flex-col gap-5   w-2/5 overflow-scroll">
          {merchantRoutes &&
            merchantRoutes.map((route, _x) => (
              <MerchantRouteCard
                key={_x}
                route={route}
                setSelectedRoute={setSelectedRoute}
                selectedRoute={selectedRoute}
              />
            ))}

          {!merchantRoutes && !isLoading && <TableNoDataFound />}
          {merchantRoutes?.length === 0 && !isLoading && <TableNoDataFound />}
          {isLoading && <TableLoader showBackground={false} />}
        </div>

        {selectedRoute && (
          <RouteDetails
            route={selectedRoute}
            setOpenEditMerchantModal={setOpenEditMerchantModal}
          />
        )}
      </div>

      {/* addMerchantRouteModal */}
      <Modal
        open={openAddMerchantRouteModal}
        onClose={() => setOpenAddMerchantRouteModal(false)}
        title="Add Merchant Route"
        dialogWrapperClass="w-1/2 md:w-[40%] p-6"
      >
        <AddMerchantRoute
          setMerchantDetails={setMerchantDetails}
          setOpenAddMerchantRouteModal={setOpenAddMerchantRouteModal}
        />
      </Modal>

      <Modal
        open={openEditMerchantModal}
        onClose={() => setOpenEditMerchantModal(false)}
        title="Update Merchant Route"
        dialogWrapperClass="w-1/2 md:w-[40%] p-6"
      >
        <UpdateMerchantRoute
          setMerchantDetails={setMerchantDetails}
          setOpenEditMerchantModal={setOpenEditMerchantModal}
          route={selectedRoute!}
        />
      </Modal>
    </div>
  );
};

export default MerchantRoutesTab;
