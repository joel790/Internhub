import React from 'react';

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg p-5 h-auto">
      <div className="flex flex-col gap-1 mb-5">
        <span className="text-base font-medium text-[#212B36]">Recent Orders</span>
        <span className="text-xs text-[#637381]">List of last 10 orders</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F4F6F8]">
            <tr>
              {["Order ID", "Product", "Date", "Amount", "Status"].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-[#637381] uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
