import { Link } from 'react-router-dom';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
const Header = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <nav className='p-7 flex items-center justify-between bg-slate-300 shadow-md border-b-2 border-black'>
        <h1 className='cursor-pointer'>CollegeBuddy</h1>
        <AiOutlineMenu className='sm:hidden' onClick={() => setClicked(!clicked)}/>
        <ul className='hidden sm:flex gap-5 items-center'>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/'}><li>Home</li></Link>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/peer-connect'}><li>Peer connect</li></Link>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/resources'}><li>Resources</li></Link>
                <Link className='hover:scale-75 transition-all duration-50 ease-out' to={'/well-being'}><li>Well being cell</li></Link>
                <Link to={'/login'} className='px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-900 text-white'>Login</Link>
            </ul>
    </nav>
  )
}

export default Header