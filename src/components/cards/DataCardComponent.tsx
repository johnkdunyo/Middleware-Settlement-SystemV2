import React from "react";

interface DataCardComponentProps {
  title: string;
  value: number;
  type?: "number" | "currency";
}

const DataCardComponent = ({
  title,
  value,
  type = "number",
}: DataCardComponentProps) => {
  return (
    <div className="border bg-white w-col  border-gray-600 px-5 py-3.5 rounded-lg flex flex-col justify-center items-center gap-1 group hover:bg-gray-50">
      <h1 className="font-bold text-xl text-primary-600">
        {type === "currency" && "GHC"} {value}
      </h1>
      <p className="text-sm">{title}</p>
    </div>
  );
};

export default DataCardComponent;
