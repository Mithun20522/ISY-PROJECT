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
  const [joined, setJoined] = useState(false);
  const isMember = currentUser && currentUser.rest && room.members.some(member => member.userId === currentUser.rest._id);

  const handleDelete = async() => {
    try {
      dispatch(deleteRoomStart());
      const res = await fetch(`http://localhost:3000/api/room/delete-room/${room._id}`,{
        method:'DELETE'
      });
      await fetch(`http://localhost:3000/api/chat/deletemessage/${room._id}`,{method:'DELETE'});
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
            dispatch(joinRoomSuccess(room));
            dispatch(addMemberSuccess({member, id:member.room._id, roomTitle:room.roomTitle}));
            toast.success('Room joined successfully');
            navigate('/chatroom');
          }
          else{
            toast.error(member.message);
            dispatch(joinRoomFailure(member.message));
            dispatch(addMemberFailure(member.message));
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
    <div className='bg-purple-50 p-4 mt-5 w-[400px] h-[200px] space-y-2 rounded-3xl border text-center content-center ml-10 shadow-md'>
        <h2 className='text-xl'>{room.roomTitle}</h2>
        <p className='text-xs'>Members: {room.members.length}</p>
        <div className="flex items-center justify-evenly">
        {isMember ? (
          <Link to="/chatroom" onClick={() => dispatch(addMemberSuccess({members:room.members, id:room._id,title:room.roomTitle}))} className='bg-blue-600 px-12 rounded-full text-sm py-2 text-white hover:bg-blue-800'>View</Link>
        ) : (
          <button onClick={handleJoinRoom} className='bg-green-600 px-12 rounded-full text-sm py-2 text-white hover:bg-green-800'>Join</button>
        )}
        {/* {
          joined && (
            <form className="bg-slate-400 p-3 absolute top-20 right-[40vw] rounded-lg">
              <h1 className=" text-sm font-semibold">would you like to go anonymous?</h1>
              <div className="flex justify-between px-5 mt-5">
                <button onClick={() => setJoined(!joined)} className="bg-slate-500 text-sm text-white hover:bg-slate-700 px-3 py-1 rounded-md">No</button>
                <button type="submit" className="bg-red-500 text-white hover:bg-red-700 text-sm px-3 py-1 rounded-md">Yes</button>
              </div>
            </form>
          )
        } */}
          {
            currentUser?.rest.isAdmin ? (
              <MdDelete onClick={handleDelete} className="text-2xl rounded-full w-10 h-10 p-1 hover:bg-gray-300 cursor-pointer "/>
            ) : ''
          }
        </div>
    </div>
  )
}

export default ChatCard