"use client";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  handleClose: () => void;
}

export const Modal = ({ open, title, handleClose, children }: ModalProps) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 h-full w-screen">
          <div className="flex h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative flex max-h-[50%] transform flex-col items-center justify-center rounded-lg bg-white px-5 py-4 text-left text-gray-900 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <Dialog.Title className="text-md mb-6 font-semibold">
                  {title}
                </Dialog.Title>
                <div
                  className="absolute right-0 top-0 flex h-12 w-12 cursor-pointer items-center justify-center text-xs text-black"
                  onClick={handleClose}
                >
                  <IoClose className="mr-2 text-2xl" />
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
