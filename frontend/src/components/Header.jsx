import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logoutSuccess } from '../redux/user/userSlice';
const Header = () => {
  const [clicked, setClicked] = useState(false);
  const [userLogout, setUserLogout] = useState(false);
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  const handleSubmit = async() => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/signout',{
        method:'POST'
      });
      const data = await res.json();
      if(res.ok){
        setUserLogout(false);
        dispatch(logoutSuccess());
        toast.success(data.message);
        return;
      }
      else{
        console.log(data.message);
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <header className='p-7 flex items-center justify-between bg-slate-300 shadow-md border-b-2 border-black'>
        <h1 className='cursor-pointer'>CollegeBuddy</h1>
        <AiOutlineMenu className='sm:hidden' onClick={() => setClicked(!clicked)}/>
        <ul className='hidden sm:flex gap-5 items-center mx-24'>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/'}><li>Home</li></Link>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/peer-connect'}><li>Peer connect</li></Link>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/resources'}><li>Resources</li></Link>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/well-being'}><li>Well being cell</li></Link>
                {
                  currentUser ? (
                      <div className=''>
                        <img src={currentUser.rest.avatar} onClick={() => setUserLogout(!userLogout)} alt={currentUser.rest.username} className='w-10 h-10 cursor-pointer rounded-full'/>
                         {
                          userLogout ? (
                            <div className='bg-sky-300 absolute px-12 py-3 right-[7%] space-y-5 rounded-lg shadow-lg items-center'>
                              <p className='text-xl'>Are you sure you want to logout ? </p>
                              <div className='flex justify-between'>
                              <button className='bg-slate-500 px-3 text-sm rounded-md hover:bg-slate-700 font-medium text-white' onClick={() => setUserLogout(!userLogout)}>No</button>
                              <button className='bg-red-500 p-2 text-sm rounded-md hover:bg-red-700 font-medium text-white' onClick={handleSubmit}>Log out</button>
                              </div>
                            </div>
                          ): ""
                         }
                         <p className='text-sm font-bold items-center absolute top-2 right-24'>{currentUser.rest.username}</p>
                      </div>
                  ): (
                    <Link to={'/login'} className='px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-900 text-white'>Login</Link>
                  )
                }
            </ul>
    </header>
  )
}

export default Header