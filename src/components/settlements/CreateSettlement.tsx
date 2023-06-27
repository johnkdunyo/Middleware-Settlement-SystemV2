import React, { ChangeEvent, SetStateAction, useState } from "react";
import Modal from "../modals";
import API from "@/network/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUploadedSettlement } from "@/types/settlement";
import { AxiosProgressEvent } from "axios";

interface CreateSettlementProp {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
}

const CreateSettlement = ({
  openModal,
  setOpenModal,
}: CreateSettlementProp) => {
  const router = useRouter();
  const [settlementReport, setSettlementReport] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formLoadingState, setFormLoadingState] = useState(false);
  const [showProgressState, setShowProgressState] = useState(false);
  const [uploadedSettlementData, setUploadedSettlementData] =
    useState<IUploadedSettlement>();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSettlementReport(file);
    }
  };

  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settlementReport) return;

    const formData = new FormData();
    formData.append("transactions", settlementReport);
    setFormLoadingState(true);
    setShowProgressState(true);
    API.post(`/settlements`, formData, {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        console.log(progressEvent);
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          console.log("progress", progress);
          setUploadProgress(progress);
        }
      },
    })
      .then((response) => {
        setUploadedSettlementData(response.data.data);
        toast.success(
          response.data.data.message || "Transactions imported successfully"
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An error occured");
      })
      .finally(() => setFormLoadingState(false));
  };

  const onDoneCloseModal = () => {
    if (!uploadedSettlementData) return;
    router.push(`/settlements/${uploadedSettlementData?.externalId!}`);
    setOpenModal(false);
    setSettlementReport(undefined);
    setUploadProgress(0);
    setShowProgressState(false);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setSettlementReport(undefined);
    setUploadProgress(0);
    setShowProgressState(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      title="Create New Settlement"
      dialogWrapperClass="w-4/5 md:w-2/5 "
    >
      <div className="w-full h-full  flex flex-col justify-between px-6 pb-4">
        <div className="mt-5 flex flex-col gap-10">
          <p className="text-black  text-sm text-center">
            Please upload your encrypted settlement report below <br />
            and click <span className="font-medium">submit</span>
          </p>

          <form
            className="w-full flex flex-col justify-center gap-10"
            onSubmit={onFormSubmitHandler}
          >
            {settlementReport ? (
              <div className="">
                <p>
                  Settlement Report Name:{" "}
                  <span className="text-gray-500">{settlementReport.name}</span>
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full  border-2  border-dashed rounded-lg cursor-pointer bg-gray-100  hover:bg-gray-200 border-gray-600  "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      only CSV, EXCEL, PDF (MAX. 44mb)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="text/csv"
                  />
                </label>
              </div>
            )}

            <div className="h-20">
              {showProgressState && (
                <div className="w-full bg-gray-300 rounded-xl">
                  <div
                    className="bg-green-600 text-xs font-medium text-white text-center p-1 leading-none rounded-xl"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress}%
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              {uploadProgress === 0 ? (
                <button
                  className={`flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800  font-medium rounded-lg text-sm px-6 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 ${
                    !settlementReport && "cursor-not-allowed bg-primary-300"
                  } `}
                  type="submit"
                >
                  {formLoadingState ? "Submiting" : "Submit"}
                </button>
              ) : uploadedSettlementData ? (
                <button
                  className={`flex items-center justify-center text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-6 py-2 dark:bg-green-600 dark:hover:bg-green-700  ${
                    !uploadedSettlementData && "cursor-not-allowed"
                  }`}
                  onClick={onDoneCloseModal}
                >
                  Done
                </button>
              ) : (
                <p className="text-center">Please wait...</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSettlement;
