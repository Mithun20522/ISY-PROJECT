import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const PageNotFound = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3000', { transports: ['websocket'] });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('chatMessage', ({ message, sender }) => {
      setMessages((prevMessages) => [...prevMessages, { message, sender }]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !inputValue.trim()) return;

    socket.emit('chatMessage', { message: inputValue });
    setMessages((prevMessages) => [...prevMessages, { message: inputValue, sender: 'user' }]);
    setInputValue('');
  };

  return (
    <div className='p-5 flex flex-col justify-center items-center h-screen'>
      <div className='w-[50vw] h-[40vh] overflow-y-auto p-3 border-black border-2'>
        {messages.map((data, index) => (
          <div key={index} className={`flex flex-col mt-2 ${data.sender === 'user' ? 'ml-auto bg-green-500' : 'mr-auto bg-red-500'} w-fit`}>
            <p>{data.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        placeholder='Type message...'
        className='bg-slate-300 w-[50vw] mt-2 outline-none'
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendMessage} className='px-3 bg-green-500 mt-2'>Send</button>
    </div>
  );
};

export default PageNotFound;
