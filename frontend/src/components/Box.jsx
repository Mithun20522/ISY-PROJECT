import React from 'react'
import {Link} from 'react-router-dom'
const Box = ({src, title, url}) => {
  return (
    <div className='bg-slate-100 p-7 max-w-fit text-center space-y-3 mx-auto transition duration-300 ease-in-out hover:scale-105 cursor-pointer rounded-lg shadow-md border'>
      <img src={src} alt={title} className='w-[300px] h-[300px]' />
      <h1 className='text-center font-bold'>{title}</h1>
    <div className='bg-teal-500 w-[100%] text-lg font-semibold text-white p-2 hover:bg-teal-700 rounded-md hover:text-white'>
      <Link target='_blank' to={url}>
        Read more
      </Link>
    </div>
    </div>
  )
}

export default Box