import React from "react";

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${active ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"}
      `}
    >
      {label}
    </button>
  );
};
