import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import Peer from "../components/Peer";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { createRoomFailure, createRoomStart, createRoomSuccess } from "../redux/room/roomSlice";

const PeerConnect = () => {
  const {currentUser} = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({});
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getRooms = async() => {
      try {
        const res = await fetch('http://localhost:3000/api/room/get-rooms', {method:'GET'});
        const data = await res.json();
        if(res.ok){
          setRooms(data);
          return;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getRooms();
  },[rooms])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(createRoomStart());
      const res = await fetch('http://localhost:3000/api/room/create-room',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(res.ok){
        toast.success(data.message);
        dispatch(createRoomSuccess(data));
        setClicked(!clicked);
        return;
      }
      else{
        dispatch(createRoomFailure(data.message))
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleOnchange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  return (
    <section className="flex flex-col justify-between w-full items-center">
      <div className="bg-slate-100 p-7 mx-[10vw] space-y-5 mt-10 rounded-2xl shadow-lg">
        <h1 className="text-center text-2xl font-bold font-sans">
          Welcome to Peer Connect
        </h1>
        <p className="">
        Peer Connect is a feature of MindLink Community that allows you to connect with others in a safe and supportive environment. Join one of our chat rooms to share your experiences, thoughts, and feelings with peers who understand what you're going through. You can choose to chat using your identity or anonymously, depending on your comfort level.
        </p>
      </div>
      <div className="flex flex-col mt-10">
        {
          currentUser?.rest.isAdmin && (
            <button onClick={() => setClicked(!clicked)} className="px-3 py-1 bg-purple-700 hover:bg-purple-900 max-w-lg mx-auto mb-5 rounded-md text-white">create room</button>
          )
        }

        {
          clicked && (
            <form className="flex gap-2 flex-col absolute bg-slate-400 p-14 top-[30%] left-[40%] rounded-xl shadow-md transition duration-200 ease-in" onSubmit={handleSubmit}>
              <AiOutlineClose onClick={() => setClicked(!clicked)} className="absolute top-3 right-7 text-2xl cursor-pointer text-white hover:bg-white hover:text-black rounded-full"/>
              <input onChange={(e) => handleOnchange(e)} required id="roomTitle" type="text" placeholder="Enter room title" className="p-3 outline-none bg-slate-200 rounded-md shadow-md " />
              <button type="submit" className="px-3 py-1 bg-teal-500 hover:bg-teal-800 text-white rounded-md">Add</button>
            </form>
          )
        }

        <h1 className="text-center text-3xl font-bold">Available meeting rooms</h1>
        <div className="flex flex-wrap mx-12">
        {
          rooms.length > 0 ? rooms.map((room) => (
              <ChatCard key={room._id} room={room} />
          )) : (
            <h1 className="max-w-lg mx-auto mt-20 text-3xl text-medium text-red-600">No rooms yet</h1>
          )
        }
        </div>
      </div>
      {/* <div>
        <h1 className="text-center mt-5 text-3xl font-bold">Your Peers</h1>
        <div className="flex flex-wrap">
        <Peer/>
        <Peer/>
        <Peer/>
        <Peer/>
        </div>
      </div> */}
    </section>

  );
};

export default PeerConnect;
