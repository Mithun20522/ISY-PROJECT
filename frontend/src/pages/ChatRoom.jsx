import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai'
import toast from "react-hot-toast";
import { RiAdminFill } from "react-icons/ri";
import { io } from 'socket.io-client';
import moment from 'moment';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { joinRoomFailure } from "../redux/room/roomSlice";

const ChatRoom = () => {
  const {currentRoom} = useSelector((state) => state.room);
  const messageboxRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [membersInfo, setMembersInfo] = useState([]);
  const [click, setClick] = useState(false);
  const [memberToBeRemoved, setMemberToBeRemoved] = useState({});
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const {member} = useSelector((state) => state.member);
  const [messageInfo, setMessageInfo] = useState([]);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let currUser = currentUser.rest.username;
  
  const val = member && member.members.some((data) => {
    if(data.userId === currentUser.rest._id){
      currUser = data.username;
      return;
    }
  });

  useEffect(() => {
    const newSocket = io('https://mindlink-backend.onrender.com', { transports: ['websocket'] });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    messageboxRef.current.scrollTop = messageboxRef.current.scrollHeight;
  },[messageInfo])
  
  

  useEffect(() => {
    if (!socket) return;

    socket.on('chatMessage', ({ message, sender,roomId }) => {
      // setMessages((prevMessages) => [...prevMessages, { message, sender, roomId}]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [socket]);

  useEffect(() => {
    const getMessages = async() => {
      const res = await fetch(`https://mindlink-backend.onrender.com/api/chat/getmessage/${member.id}`,{method:'GET'});
      const data = await res.json();
      setMessageInfo(data);
    }
    getMessages();
  },[messageInfo]);

  const sendMessage = async() => {
    try {
      if (!socket || !inputValue.trim()) return;
      socket.emit('chatMessage', { message: inputValue, sender:currUser, roomId:member.id });
      // setMessages((prevMessages) => [...prevMessages, { message: inputValue, sender:currentUser.rest.username }]);
      setInputValue('');
      const res = await fetch('https://mindlink-backend.onrender.com/api/chat/sendmessage',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ message: inputValue, sender:currUser, roomId:member.id })
      });
      const data = await res.json();
      if(res.ok){
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(messageInfo)
  useEffect(() => {
    const getMembersInfoFromRoom = async() => {
      try {
        const res = await fetch(`https://mindlink-backend.onrender.com/api/room/get-room/${member.id}`);
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

  const memberExist = async(userId, username) => {
    try {
      const currentMembersRes = await fetch(`https://mindlink-backend.onrender.com/api/room/get-room/${member.id}`);
      const currentMembersData = await currentMembersRes.json();
      const currentMembers = currentMembersData.members;
      const membersAfterDeletion = currentMembers.filter((curr) => curr.userId !== userId);
      const res = await fetch(`https://mindlink-backend.onrender.com/api/room/update-room/${member.id}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({members:membersAfterDeletion})
      })
      const data = await res.json();
      if(res.ok){
        toast.success('You left the room');
        navigate('/peer-connect');
      }
      else{
        toast.error(data.message);
        console.log(data.message);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMemberDelete = async() => {
    try {
      if(!memberToBeRemoved) {
        toast.error('please select a user first!');
        return;
      }
      const currentMembersRes = await fetch(`https://mindlink-backend.onrender.com/api/room/get-room/${memberToBeRemoved.roomId}`);
      const currentMembersData = await currentMembersRes.json();
      const currentMembers = currentMembersData.members;
      const membersAfterDeletion = currentMembers.filter((curr) => curr.username !== memberToBeRemoved.memberName);
      const res = await fetch(`https://mindlink-backend.onrender.com/api/room/update-room/${memberToBeRemoved.roomId}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({members:membersAfterDeletion})
      })
      const data = await res.json();
      if(res.ok){
        toast.success('member removed from the room');
        setClick(!click);
        return;
      }
      else{
        toast.error(data.message);
        console.log(data.message);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChatDelete = async(req, res) => {
    try {
      if(currentUser && currentUser.rest.isAdmin){
        const res = await fetch(`https://mindlink-backend.onrender.com/api/chat/deletemessage/${member.id}`,{method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        }});
        const data = await res.json();
        if(res.ok){
          toast.success('Chat deleted successfully');
        }
        else{
          toast.error(data.message);
          return;
        }
      }
      else{
        toast.error('You can not delete the chat');
        return;
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='flex max-w-5xl mx-auto mt-10 border rounded-lg shadow-md'>
      <div className='bg-slate-100 w-[20vw] border'>
      <h1 className="text-center border-b py-[10px] border-black ">All Members: {membersInfo && membersInfo.length > 0 ? membersInfo.length : 0}</h1>
          {
            membersInfo && membersInfo.map((room) => (
              <div key={room.userId} onClick={() => {
                setMemberToBeRemoved({memberName:room.username,memberId:room.userId,roomId:member.id});
                setClick(!click);
                }} 
                className={`flex gap-1 items-center px-5 py-2 mt-2 mx-2 rounded-xl ${currentUser?.rest.isAdmin ? 'cursor-pointer hover:shadow-md hover:bg-slate-300 transition-shadow' : ''}`}>
                  <img src={room.avatar} alt={room.username} className="w-6 h-6" />
                  <p className="text-sm">{room.username}</p>
              </div>
            ))
          }
            {
              currentUser.rest.isAdmin && click && (
                <div className="bg-slate-400 absolute p-3 top-20 rounded-lg space-y-2 left-[40%]">
                  <p className="text-sm font-bold text-white max-w-xs">Sure you want to remove <span className="font-bold">{`"${memberToBeRemoved.memberName}"`}</span> ?</p>
                  <div className="flex justify-between mx-2">
                    <button onClick={() => setClick(!click)} className='px-3 py-1 rounded-md font-semibold text-white bg-slate-700 hover:bg-slate-900'>No</button>
                    <button onClick={handleMemberDelete} className="px-3 py-1 rounded-md font-semibold text-white bg-red-500 hover:bg-red-700">Yes</button>
                  </div>
                </div>
              )
            }
          </div>
        <div className="w-full">
          <div className="bg-slate-100 border flex items-center justify-between px-7">
          <h1 className="text-xl font-bold text-black p-2 text-center">{member.title}</h1>
          {
            currentUser && currentUser.rest.isAdmin ? (
              <MdOutlineDeleteSweep onClick={handleChatDelete} className={`text-3xl cursor-pointer hover:bg-slate-300 hover:text-white rounded-full p-1 w-10 h-10`}/>
            ) : (
              <BiExit onClick={() => memberExist(currentUser.rest._id, currentUser.rest.username)} className={`text-3xl cursor-pointer hover:bg-slate-300 hover:text-white rounded-full p-1 w-10 h-10`}/>
            )
          }
          </div>
            <div>
                <div ref={messageboxRef} className="h-[55vh] rounded-lg bg-slate-50 overflow-y-auto space-y-1 relative px-3">
                  <div className="flex flex-col">
                  {
                    messageInfo.length > 0 ? messageInfo.map((data) => (
                      <div key={data._id} className={`max-w-fit p-2 incoming_message ${data.sender === currUser ? 'ml-auto' : 'mr-auto'}`}>
                    <div className="w-fit flex gap-1 items-center font-medium p-1 ">
                        <img src={currentUser.rest.avatar} alt="member" className="w-6 h-6" />
                        <p className="text-[0.6rem]">{data.sender}</p>
                    </div>
                    <p className={`bg-slate-200 shadow-sm p-3 overflow-hidden rounded-lg max-w-lg`}>
                      {data.message}
                    </p>
                      <span className="text-gray-400 text-xs">{moment(data.createdAt).fromNow()}</span>
                    </div>
                    )) : (
                      <h1 className="text-center mt-40 text-4xl text-slate-400 fonr-thin">No conversation yet</h1>
                    )
                  }
                  </div>
                </div>

                <div className="flex items-center relative">
                    <input id="message" value={inputValue} onKeyUp={(e) => e.key === 'Enter' && sendMessage()} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='Type message.....' className="bg-slate-200 outline-none rounded-md p-3 w-full" />
                    <IoMdSend onClick={sendMessage} className="text-3xl absolute right-5 hover:bg-slate-500 hover:p-2 rounded-full cursor-pointer hover:text-white transition duration-200 ease-in-out"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ChatRoom