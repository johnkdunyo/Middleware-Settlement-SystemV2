import { IPageMeta } from "@/types/pageMeta";
import { ISettlementDetails } from "@/types/settlement";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import API from "@/network/api";
import { toast } from "react-toastify";

import { ITabs } from "@/types/tab";

import { IMerchantData } from "@/types/merchant";
import SelectMenuComponent from "@/components/uis/SelectMenuComponentV2";
import { formatDate } from "@/utils/formatDate";
import AuthLayout from "@/layout/AuthLayout";
import SettlementSummary from "@/components/settlements/SettlementSummary";
import SettlementTabButton from "@/components/settlements/SettlementTabButton";
import RoutesTab from "@/components/settlements/RoutesTab";
import MerchantsTab from "@/components/settlements/MerchantsTab";

const settlementTabs: ITabs[] = [
  {
    id: 1,
    title: "Merchants",
  },
  {
    id: 2,
    title: "Routes",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageMeta, setPageMeta] = useState<IPageMeta>();
  const [currentTab, setCurrenTab] = useState(settlementTabs[0]);
  const [settlementDetails, setSettlementDetails] =
    useState<ISettlementDetails>();
  const [url, setUrl] = useState(`/settlements`);
  const [allMerchantsData, setAllMerchants] = useState<IMerchantData[]>();
  const [summaryText, setSummaryText] = useState("");

  const [selectedMerchant, setSelectedMerchant] = useState<
    IMerchantData | undefined
  >(
    allMerchantsData
      ? allMerchantsData[0]
      : ({ name: "select merchant" } as IMerchantData)
  );

  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  };
  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let urll = `/settlements`;
    if (dateValue.startDate) {
      urll += `?from=${dateValue.startDate}`;
    }
    if (dateValue.endDate) {
      urll += `&to=${dateValue.endDate}`;
    }

    if (selectedMerchant?.externalId && dateValue.startDate) {
      urll += `&merchant=${selectedMerchant.externalId}`;
    }
    if (selectedMerchant?.externalId && !dateValue.startDate) {
      urll += `?merchant=${selectedMerchant.externalId}`;
    }
    setUrl(urll);
  };

  const handleClearForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUrl(`/settlements`);
    setDateValue({
      startDate: null,
      endDate: null,
    });
    setSelectedMerchant({ name: "select merchant" } as IMerchantData);
  };

  useEffect(() => {
    setIsLoading(true);
    setSettlementDetails(undefined);
    API.get(url)
      .then((response) => {
        setSettlementDetails(response.data.data);
        setPageMeta(response.data.meta);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Error fetching all merchants"
        );
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const start = dateValue.startDate || currentDate;
    const end = dateValue.endDate || currentDate;
    const startDate = formatDate(start);
    const endDate = formatDate(start);
    if (start === end) {
      setSummaryText(`Reports as at: ${startDate}`);
    } else {
      setSummaryText(`Reports from ${startDate} to ${endDate}`);
    }
  }, [dateValue]);

  // get all merchants
  useEffect(() => {
    API.get("/merchants")
      .then((response) => {
        setAllMerchants(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Error fetching all merchants"
        );
      });
  }, []);

  return (
    <AuthLayout>
      <div
        className={` md:ml-52 xl:h-[86vh]  2xl:h-[89vh]  h-[89vh] mt-20   border-black  flex flex-col justify-between gap-4 2xl:gap-6`}
      >
        <div className="border-b h-12">
          <form
            className="flex items-center py-0 px-0 pb-1.5 w-full gap-4  border-red-500"
            onSubmit={onFormSubmitHandler}
          >
            <div className="w-1/3">
              <Datepicker
                placeholder="select date"
                inputClassName="w-full rounded-md focus:ring-0 font-normal bg-green-100 dark:bg-white dark:placeholder:text-gray-600 border border-gray-600 py-1.5 px-2"
                separator={"to"}
                value={dateValue}
                onChange={handleValueChange}
                showShortcuts={true}
              />
            </div>

            <div className="h-full w-60  ">
              <SelectMenuComponent<IMerchantData>
                title=""
                dataArray={allMerchantsData}
                setSelectedData={setSelectedMerchant}
                selectedData={selectedMerchant}
              />
            </div>

            {/* search filters */}
            <div className="  flex justify-end gap-4">
              <button
                className=" w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium border rounded-lg hover:bg-gray-100 hover:text-primary-600"
                onClick={handleClearForm}
              >
                Clear
              </button>

              <button
                className=" w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium bg-green-600 text-white border rounded-lg hover:bg-green-700"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="h-10">
          <p className=" -mt-5 border-b">{summaryText}</p>
        </div>
        <div className="w-full h-full flex flex-col  border-yellow-400">
          <SettlementSummary
            settlementSummary={settlementDetails?.summary!}
            isLoading={isLoading}
          />

          <section className="w-full h-full justify-between flex flex-col mt-5">
            <div className="flex justify-between items-center">
              <ul className="flex flex-wrap text-sm font-medium text-center  border-gray-200">
                {settlementTabs.map((tab) => (
                  <SettlementTabButton
                    key={tab.id}
                    tab={tab}
                    setCurrentTab={setCurrenTab}
                    currentTab={currentTab}
                  />
                ))}
              </ul>
            </div>

            <div className="w-full bg-white  flex flex-col  border ">
              {currentTab.title === "Routes" && (
                <RoutesTab
                  isLoading={isLoading}
                  settlementRoutes={settlementDetails?.routes!}
                />
              )}
              {currentTab.title === "Merchants" && (
                <MerchantsTab
                  isLoading={isLoading}
                  settlementMerchants={settlementDetails?.merchants!}
                  showSettledAtDate={false}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </AuthLayout>
  );
}
