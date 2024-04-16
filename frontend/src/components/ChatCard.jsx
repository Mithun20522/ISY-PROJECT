import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteRoomFailure, deleteRoomStart, deleteRoomSuccess } from "../redux/room/roomSlice";
import { Link } from 'react-router-dom';

const ChatCard = ({room}) => {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
  return (
    <div className='bg-slate-50 p-4 mt-5 w-[200px] h-[200px] space-y-2 rounded-3xl border text-center content-center ml-10'>
        <h2 className='text-xl'>{room.roomTitle}</h2>
        <p className='text-xs'>available users: 3</p>
        <div className="flex items-center justify-evenly">
        <Link to={'/chatroom'} className='bg-green-600 px-4 rounded-full text-sm py-1 text-white hover:bg-green-800'>Join</Link>
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