import React from "react";
import ChatCard from "../components/ChatCard";
import Peer from "../components/Peer";

const PeerConnect = () => {
  return (
    <div className="flex flex-col justify-center w-full h-screen items-center">
      <div>
        <h1 className="text-center text-3xl font-bold">Available meeting rooms</h1>
        <div className="flex flex-wrap">
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
      </div>
      <div>
        <h1 className="text-center mt-5 text-3xl font-bold">Your Peers</h1>
        <div className="flex flex-wrap">
        <Peer/>
        <Peer/>
        <Peer/>
        <Peer/>
        </div>
      </div>
    </div>

  );
};

export default PeerConnect;
