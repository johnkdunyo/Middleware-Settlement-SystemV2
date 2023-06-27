import { TableCellsIcon } from "@heroicons/react/20/solid";
import React from "react";

interface ITableNoDataFounProps {
  showBackground?: boolean;
  title?: string;
}

const TableNoDataFound = ({
  showBackground,
  title = "data",
}: ITableNoDataFounProps) => {
  return (
    <div
      className={`h-full w-full border-red-500 flex flex-col items-center justify-center ${
        showBackground && "bg-gray-50"
      }`}
    >
      <div role="status" className="flex flex-col items-center gap-2">
        <TableCellsIcon className="h-6 w-6 text-gray-500" />

        <span className="text-lg text-gray-400">Opps, No {title} found</span>
      </div>
    </div>
  );
};

export default TableNoDataFound;
