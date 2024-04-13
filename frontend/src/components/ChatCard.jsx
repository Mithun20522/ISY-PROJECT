import React from 'react'

const ChatCard = () => {
  return (
    <div className='bg-slate-50 p-4 mt-5 w-[200px] h-[200px] space-y-2 rounded-3xl border text-center content-center ml-10'>
        <h2 className='text-xl'>Group1</h2>
        <p className='text-xs'>available users: 3</p>
        <button className='bg-green-600 px-4 rounded-full text-sm py-1 text-white hover:bg-green-800'>Join</button>
    </div>
  )
}

export default ChatCard