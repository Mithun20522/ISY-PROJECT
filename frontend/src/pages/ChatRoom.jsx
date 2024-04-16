import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const ChatRoom = () => {
  return (
    <section className="flex gap-2 max-w-5xl mx-auto p-3 mt-10">
      <div className="">
        <div>Total Members: 5</div>
      </div>
      <div className="w-full">
        <h1 className="text-center text-4xl font-medium text-gray-500 mb-5">
          room title
        </h1>
        <div>
          <div className="h-[55vh] rounded-lg shadow-lg bg-slate-50 overflow-scroll space-y-1 relative">
            <div className="max-w-fit p-2 mx-2 mt-1">
              <div className="w-fit flex gap-1 items-center font-medium p-1 ">
                <img
                  src="https://avatar.iran.liara.run/public/boy"
                  alt="member"
                  className="w-6 h-6"
                />
                <p className="text-[0.6rem]">username</p>
              </div>
              <p className="bg-slate-200 shadow-sm p-3 overflow-hidden rounded-lg max-w-lg">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                velit nobis assumenda. Iure, nesciunt incidunt!
              </p>
            </div>
            <div className="max-w-fit p-2 absolute right-0 mx-2">
              <div className="w-full font-medium p-1">
                <div className="flex justify-end gap-1 mx-2 mb-1 items-center">
                <p className="text-[0.6rem]">username</p>
                  <img
                    src="https://avatar.iran.liara.run/public/boy"
                    alt="member"
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <p className="bg-slate-200 shadow-sm p-3 overflow-hidden rounded-lg max-w-lg">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                velit nobis assumenda. Iure, nesciunt incidunt!
              </p>
            </div>
          </div>
          <div className="flex items-center relative">
            <input
              id="message"
              type="text"
              placeholder="Type message....."
              className="bg-slate-200 shadow-md outline-none rounded-md p-3 w-full"
            />
            <IoMdSend className="text-3xl absolute right-5 hover:bg-slate-500 hover:p-2 rounded-full cursor-pointer hover:text-white transition duration-200 ease-in-out" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
