import React from 'react';

const Messages = ({ messages }) => {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg w-full p-5 h-auto">
      <div className="flex flex-col gap-1 mb-5">
        <span className="text-base font-medium text-[#212B36]">Messages</span>
        <span className="text-xs text-[#637381]">You have {messages.length} unread messages</span>
      </div>
      {messages.map((data, index) => (
        <div key={index} className="flex items-center gap-2 mb-5">
          <img src={data.image} alt="profile" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm text-[#212B36] font-medium">{data.name}</span>
            <span className="text-xs text-[#637381]">{data.message}</span>
          </div>
          <span className="text-xs text-[#637381]">{data.time}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
