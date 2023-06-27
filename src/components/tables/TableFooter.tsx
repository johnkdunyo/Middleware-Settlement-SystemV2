import React from "react";

const TableFooter = () => {
  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0  pt-3  ">
      <span className="text-sm font-normal  font-italics text-black ">
        Showing 10 of 50
      </span>
      <div className="inline-flex items-stretch -space-x-px">
        <button>
          <a className="flex items-center justify-center h-full py-1 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700  ">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="">Previous</span>
          </a>
        </button>

        <button>
          <a className="flex items-center justify-center h-full py-1 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
            <span className="">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </button>
      </div>
    </nav>
  );
};

export default TableFooter;
