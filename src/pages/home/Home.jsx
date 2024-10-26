import React from "react";
import Chat from "../chat/Chat";
import Nav from "../../components/nav/Nav";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <Nav />
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
