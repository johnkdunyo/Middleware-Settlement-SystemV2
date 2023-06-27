"use client";

import React, { Fragment, useRef } from "react";
import cn from "classnames";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  children: React.ReactNode;
  open: boolean;
  enableOutsideClickClose?: boolean;
  onClose(): void;
  position?: "left" | "center" | "right" | "TopRight" | "BottomRight";
  title?: string;
  dialogWrapperClass?: string;
};

const Modal = ({
  children,
  open,
  onClose,
  title,
  dialogWrapperClass,
}: Props) => {
  return (
    <Transition
      appear
      show={open}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog open={open} onClose={onClose} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`w-auto p-5 rounded-lg bg-white h-auto ${dialogWrapperClass!}`}
          >
            <Dialog.Title>
              <div className="border-b pb-1 flex justify-between">
                <h1 className="text-gray-600 font-medium text-xl">{title}</h1>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-6 w-6 " />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </Dialog.Title>
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
