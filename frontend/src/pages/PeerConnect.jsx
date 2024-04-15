import React, { useState } from "react";
import ChatCard from "../components/ChatCard";
import Peer from "../components/Peer";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { createRoom } from "../redux/chat/roomSlice";
import { toast } from 'react-hot-toast';

const PeerConnect = () => {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [roomInfoData, setRoomInfoData] = useState({});

  const {roomInfo} = useSelector((state) => state.room)
  const [clicked, setClicked] = useState(false);

  const handleSubmit = (e) => {
      e.preventDefault();
      setClicked(!clicked);
      dispatch(createRoom([roomInfoData]));
      toast.success(`"${roomInfoData.roomTitle}" room created.`);
  }

  const handleChange = (e) => {
    setRoomInfoData({
      ...roomInfoData,
      [e.target.id]:e.target.value
    })
  }

  return (
    <div className="flex flex-col justify-center w-full h-screen items-center">
      <div className="flex flex-col">
        {
          currentUser?.rest.isAdmin && (
            <button onClick={() => setClicked(!clicked)} className="px-3 py-1 bg-purple-700 hover:bg-purple-900 mx-[40%] mb-5 rounded-md text-white">create room</button>
          )
        }

        {
          clicked && (
            <form className="flex gap-2 flex-col absolute bg-slate-400 p-14 top-[30%] left-[40%] rounded-xl shadow-md transition duration-200 ease-in" onSubmit={handleSubmit}>
              <AiOutlineClose onClick={() => setClicked(!clicked)} className="absolute top-3 right-7 text-2xl cursor-pointer text-white hover:bg-white hover:text-black rounded-full"/>
              <input required id="roomTitle" onChange={(e) => handleChange(e)} type="text" placeholder="Enter room title" className="p-3 outline-none bg-slate-200 rounded-md shadow-md " />
              <button type="submit" className="px-3 py-1 bg-teal-500 hover:bg-teal-800 text-white rounded-md">Add</button>
            </form>
          )
        }

        <h1 className="text-center text-3xl font-bold">Available meeting rooms</h1>
        <div className="flex flex-wrap">
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
      </div>
      <div>
        <h1 className="text-center mt-5 text-3xl font-bold">Your Peers</h1>
        <div className="flex flex-wrap">
        <Peer/>
        <Peer/>
        <Peer/>
        <Peer/>
        </div>
      </div>
    </div>

  );
};

export default PeerConnect;
