import React from 'react';
import { FaArrowUp, } from 'react-icons/fa';

const Card = ({ type, percentage, arrow, price, graph }) => {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg p-4 flex justify-between items-start">
      <div className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#212B36]">{type}</span>
        <div className="flex gap-1 items-center">
          <span className={`text-sm ${arrow === <FaArrowUp /> ? "text-[#00AB55]" : "text-[#FF3D57]"}`}>{arrow} {percentage}</span>
          <span className="text-xs text-[#637381]">vs last month</span>
        </div>
        <span className="text-xl text-[#212B36] font-semibold">{price}</span>
      </div>
      <div className="text-[#212B36]">
        {graph}
      </div>
    </div>
  );
};

export default Card;
