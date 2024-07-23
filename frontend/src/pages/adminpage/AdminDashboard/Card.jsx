import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Card = ({ type, percentage, arrow, graph, count }) => {
  const isUp = arrow === "up";
  const arrowIcon = isUp ? (
    <FaArrowUp className="text-green-500" />
  ) : (
    <FaArrowDown className="text-red-500" />
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold">{type}</h3>
        <p className="text-2xl font-bold mt-2">{count}</p>
        <p className="text-sm text-gray-500 mt-1 flex items-center">
          {arrowIcon}
          <span className={isUp ? "text-green-500 ml-1" : "text-red-500 ml-1"}>
            {percentage}
          </span>
        </p>
      </div>
      <div className="text-[#212B36]">{graph}</div>
    </div>
  );
};

export default Card;
