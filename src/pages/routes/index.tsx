import { IServerRoute } from "@/types/route";
import React, { useEffect, useState } from "react";
import API from "@/network/api";
import TableLoader from "@/components/tables/TableLoader";
import TableNoDataFound from "@/components/tables/TableNoDataFound";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/modals";
import AddRoute from "../../components/routeComps/AddRoute";
import { toast } from "react-toastify";
import AuthLayout from "@/layout/AuthLayout";
import { getSession, signOut, useSession } from "next-auth/react";
import UpdateRoute from "@/components/routeComps/UpdateRoute";

interface SingleTableRowProps {
  title: string;
  value: string;
  isCurrency?: boolean;
}

interface SingleRouteCardProps {
  route: IServerRoute;
  setSelectedRoute: React.Dispatch<
    React.SetStateAction<IServerRoute | undefined>
  >;
  selectedRoute: IServerRoute;
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

const SingleRouteCard = ({
  route,
  selectedRoute,
  setSelectedRoute,
}: SingleRouteCardProps) => {
  return (
    <div
      className={`border w-auto  hover:bg-gray-200 rounded-lg text-black cursor-pointer p-5 ${
        selectedRoute?.externalId === route.externalId
          ? "bg-gray-200"
          : "bg-white border-gray-300"
      }`}
      onClick={() => setSelectedRoute(route)}
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

const RouteDetailsCard = ({
  selectedRoute,
  setSelectedRoute,
  setOpenUpdateRouteModal,
}: {
  selectedRoute: IServerRoute;
  setSelectedRoute: React.Dispatch<
    React.SetStateAction<IServerRoute | undefined>
  >;
  setOpenUpdateRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" h-full w-full flex flex-col justify-between  bg-white border border-gray-200 rounded-lg text-black">
      <div className=" border-b px-3 pt-2  flex justify-between">
        <h1 className="text-blue-900 font-medium">Route Details</h1>
        <button onClick={() => setSelectedRoute(undefined)}>
          <XMarkIcon className="h-6 w-6 text-gray-500 hover:bg-gray-200 rounded-lg m-1.5" />
        </button>
      </div>
      <div className="flex flex-col justify-between h-full  ">
        <div className="px-4">
          <table className="table-auto w-full text-base mt-6 ">
            <thead></thead>
            <tbody>
              <SingleTableRow title="name" value={selectedRoute?.name || ""} />
              <SingleTableRow
                title="rSwitch"
                value={selectedRoute?.rSwitch || ""}
              />
              <SingleTableRow
                title="minCapAmount"
                value={String(selectedRoute?.minCapAmount) || "0"}
                isCurrency={true}
              />
              <SingleTableRow
                title="minCapAmountFee"
                value={String(selectedRoute?.minCapAmountFee) || "0"}
                isCurrency={true}
              />
              <SingleTableRow
                title="maxCapAmount"
                value={String(selectedRoute?.maxCapAmount) || "0"}
                isCurrency={true}
              />
              <SingleTableRow
                title="maxCapAmountFee"
                value={String(selectedRoute?.maxCapAmountFee) || "0"}
                isCurrency={true}
              />

              <SingleTableRow
                title="defaultMinCapAmount"
                value={String(selectedRoute?.defaultMinCapAmount) || "0"}
                isCurrency={true}
              />
              <SingleTableRow
                title="defaultMinCapAmountFee"
                value={String(selectedRoute?.defaultMinCapAmountFee) || "0"}
                isCurrency={true}
              />
              <SingleTableRow
                title="defaultMaxCapAmount"
                value={String(selectedRoute?.defaultMaxCapAmount) || "0"}
                isCurrency={true}
              />
              <SingleTableRow
                title="defaultMaxCapAmountFee"
                value={String(selectedRoute?.defaultMaxCapAmountFee) || "0"}
                isCurrency={true}
              />
              <SingleTableRow
                title="percentageFee"
                value={String(selectedRoute?.percentageFee) || "0"}
              />
              <SingleTableRow
                title="merchantCount"
                value={String(selectedRoute?.merchant.length) || "0"}
              />
            </tbody>
          </table>
        </div>

        <div className=" border-t  w-full  flex justify-between px-3 py-2 text-sm  text-white">
          <button
            className="px-3 py-1.5 rounded-lg  bg-green-500 hover:bg-green-600"
            onClick={() => setOpenUpdateRouteModal(true)}
          >
            Update Route
          </button>
          <button className="px-3 py-1.5 rounded-lg  bg-red-700 hover:bg-red-800">
            Delete Route
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [routes, setRoutes] = useState<IServerRoute[]>();
  const [selectedRoute, setSelectedRoute] = useState<IServerRoute>();
  const [isLoading, setIsLoading] = useState(false);

  const [openUpdateRouteModal, setOpenUpdateRouteModal] = useState(false);
  const [openAddRouteModal, setOpenAddRouteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    API.get(`/routes`)
      .then((response) => {
        // console.log(response.data.data);
        setRoutes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occured");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthLayout>
      <div className=" md:ml-52 h-[89vh] 2xl:h-[90vh] mt-20 overflow-clip  flex flex-col justify-between gap-4">
        <div className="w-full  border-b pb-2  flex justify-end  px-3 pt-2.5">
          <div className="">
            <button
              onClick={() => setOpenAddRouteModal(true)}
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
              Add Route
            </button>
          </div>
        </div>
        <div className="w-full h-[80vh] grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div
            className={` ${
              selectedRoute ? "w-auto" : "col-span-2"
            } h-full overflow-scroll gap-6 flex flex-col  `}
          >
            {isLoading && <TableLoader showBackground={false} />}
            {!isLoading && !routes && <TableNoDataFound title="route" />}
            <div
              className={`grid ${
                selectedRoute ? "grid-cols-1 p-5" : "grid-cols-3 "
              } w-full gap-8  overflow-scroll`}
            >
              {routes &&
                routes.map((route, _x) => (
                  <SingleRouteCard
                    key={_x}
                    route={route}
                    setSelectedRoute={setSelectedRoute}
                    selectedRoute={selectedRoute!}
                  />
                ))}
            </div>
          </div>

          {selectedRoute && (
            <RouteDetailsCard
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
              setOpenUpdateRouteModal={setOpenUpdateRouteModal}
            />
          )}
        </div>
      </div>

      <Modal
        title="Update Route"
        open={openUpdateRouteModal}
        onClose={() => setOpenUpdateRouteModal(false)}
        dialogWrapperClass="w-2/5 md:w-1/3"
      >
        <UpdateRoute
          setOpenUpdateRouteModal={setOpenUpdateRouteModal}
          route={selectedRoute!}
        />
      </Modal>

      <Modal
        title="Add Route"
        open={openAddRouteModal}
        onClose={() => setOpenAddRouteModal(false)}
        dialogWrapperClass="w-2/5 md:w-[55%] p-6"
      >
        <AddRoute setOpenAddRouteModal={setOpenAddRouteModal} />
      </Modal>
    </AuthLayout>
  );
};

export default Page;

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
