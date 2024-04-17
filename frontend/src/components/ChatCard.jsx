import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteRoomFailure, deleteRoomStart, deleteRoomSuccess, joinRoomFailure, joinRoomStart, joinRoomSuccess } from "../redux/room/roomSlice";
import { Link, useNavigate } from 'react-router-dom';
import { addMemberFailure, addMemberStart, addMemberSuccess } from "../redux/room/memberSlice";
import { useEffect, useState } from "react";

const ChatCard = ({room}) => {
  const {currentUser} = useSelector((state) => state.user);
  const {member} = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMember = currentUser && currentUser.rest && room.members.some(member => member.userId === currentUser.rest._id);

  const handleDelete = async() => {
    try {
      dispatch(deleteRoomStart());
      const res = await fetch(`http://localhost:3000/api/room/delete-room/${room._id}`,{
        method:'DELETE'
      });
      const data = await res.json();
      if(res.ok){
        toast.success(data.message);
        dispatch(deleteRoomSuccess());
        return;
      }
      else{
        toast.error(data.message);
        dispatch(deleteRoomFailure(data.message));
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleJoinRoom = async() => {
    try {
        if(currentUser && currentUser.rest && room){
          dispatch(joinRoomStart());
          dispatch(joinRoomSuccess(room));
          dispatch(addMemberStart());
          const currentMembersRes = await fetch(`http://localhost:3000/api/room/get-room/${room._id}`);
          const currentMembersData = await currentMembersRes.json();
          const currentMembers = currentMembersData.members;
          
          const updatedMembers = [...currentMembers, {userId:currentUser.rest._id,username:currentUser.rest.username, avatar:currentUser.rest.avatar}];

          const res2 = await fetch(`http://localhost:3000/api/room/update-room/${room._id}`,{
            method:'PATCH',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({members: updatedMembers})
          })
          const member = await res2.json();
          if(res2.ok){
            dispatch(addMemberSuccess({member, id:room._id, roomTitle:room.roomTitle}));
            toast.success('Room joined successfully');
            navigate('/chatroom');
          }
          else{
            toast.error(member.message);
            console.log(member.message);
            return;
          }

        }
        else{
          toast.error('Login required to join the room');
          dispatch(joinRoomFailure(room.error));
          dispatch(addMemberFailure(room.error));
          return;
        }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='bg-slate-50 p-4 mt-5 w-[200px] h-[200px] space-y-2 rounded-3xl border text-center content-center ml-10'>
        <h2 className='text-xl'>{room.roomTitle}</h2>
        <p className='text-xs'>Members: {room.members.length}</p>
        <div className="flex items-center justify-evenly">
        {isMember ? (
          <Link to="/chatroom" className='bg-blue-600 px-4 rounded-full text-sm py-1 text-white hover:bg-blue-800'>View</Link>
        ) : (
          <button onClick={handleJoinRoom} className='bg-green-600 px-4 rounded-full text-sm py-1 text-white hover:bg-green-800'>Join</button>
        )}

        {/* <button onClick={handleJoinRoom} className='bg-green-600 px-4 rounded-full text-sm py-1 text-white hover:bg-green-800'> Join</button> */}
          {
            currentUser?.rest.isAdmin ? (
              <MdDelete onClick={handleDelete} className="text-xl cursor-pointer hover:scale-100 transition-shadow duration-100"/>
            ) : ''
          }
        </div>
    </div>
  )
}

export default ChatCard