import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai'
import toast from "react-hot-toast";
import { RiAdminFill } from "react-icons/ri";
const ChatRoom = () => {
  const {currentRoom} = useSelector((state) => state.room);
  const {currentUser} = useSelector((state) => state.user);
  const [membersInfo, setMembersInfo] = useState([]);
  const [click, setClick] = useState(false);
  const {member} = useSelector((state) => state.member);
  
  useEffect(() => {
    const getMembersInfoFromRoom = async() => {
      try {
        const res = await fetch(`http://localhost:3000/api/room/get-room/${currentRoom._id}`);
        const data = await res.json();
        if(res.ok){
          setMembersInfo(data.members);
        }
        else{
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMembersInfoFromRoom();
  },[membersInfo]);

  return (
    <section className='flex max-w-5xl mx-auto mt-10 border'>
      <div className='bg-slate-100 w-[20vw] border'>
      <h1 className="text-center p-4 border-b border-black ">All Members: {membersInfo && membersInfo.length > 0 ? membersInfo.length : 0}</h1>
          {
            membersInfo && membersInfo.map((room) => (
              <div key={room.userId} onClick={() => setClick(!click)} className={`flex gap-1 items-center px-5 py-2 mt-2 mx-2 rounded-xl ${currentUser?.rest.isAdmin ? 'cursor-pointer hover:shadow-md hover:bg-slate-300 transition-shadow' : ''}`}>
                  <img src={room.avatar} alt={room.username} className="w-6 h-6" />
                  <p className="text-sm">{room.username}</p>
              </div>
            ))
          }
            {
              click && (
                <div className="bg-slate-400 absolute p-3 top-20 rounded-lg space-y-2 left-[40%]">
                  <p className="text-sm font-bold text-white max-w-xs">Sure you want to remove {currentUser.rest.username} ?</p>
                  <div className="flex justify-between mx-2">
                    <button onClick={() => setClick(!click)} className='px-3 py-1 rounded-md font-semibold text-white bg-slate-700 hover:bg-slate-900'>No</button>
                    <button className="px-3 py-1 rounded-md font-semibold text-white bg-red-500 hover:bg-red-700">Yes</button>
                  </div>
                </div>
              )
            }
          </div>
        <div className="w-full">
            <h1 className="text-center text-4xl font-medium text-black border bg-slate-100 p-2">{membersInfo.roomTitle}</h1>
            <div>
                <div className="h-[55vh] rounded-lg bg-slate-50 overflow-scroll space-y-1 relative px-3">
                <div className="max-w-fit p-2">
                    {/* {
                      membersInfo && membersInfo.map((room) => (
                        <div key={room.userId} className="w-fit flex gap-1 items-center font-medium p-1 ">
                        <img src={room.avatar} alt="member" className="w-6 h-6" />
                        <p className="text-[0.6rem]">{room.username}</p>
                      </div>
                      ))
                    } */}
                    <p className="bg-slate-200 shadow-sm p-3 overflow-hidden rounded-lg max-w-lg">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. A velit nobis assumenda. Iure, nesciunt incidunt!
                    </p>
                </div>
                </div>
                <div className="flex items-center relative">
                    <input id="message" type="text" placeholder='Type message.....' className="bg-slate-200 outline-none rounded-md p-3 w-full" />
                    <IoMdSend className="text-3xl absolute right-5 hover:bg-slate-500 hover:p-2 rounded-full cursor-pointer hover:text-white transition duration-200 ease-in-out"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ChatRoom