import React, { useState } from "react";
import UserChatCard from "../card/UserChatCard";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket";
import { MdGroup } from "react-icons/md";
import { Addgroup, removeUser } from "../../../store/Reducers/userReducer";
import {
  asyncUserLogin,
  asyncUserLogout,
} from "../../../store/Actions/userAction";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";

const ChatUserLeftNav = ({ setchatPartner, setdisplayMsg }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { activeUsers } = useSelector((state) => state.userReducer);
  const fetchMessages = (receiver) => {
    socket.emit("fetchMessages", { sender: user, receiver: receiver });
    socket.on("fetchPrivateMessages", (data) => {
      setdisplayMsg([...data]);
    });
  };

  const serachUser = () => {
    dispatch(asyncUserLogout());
  };

  const [groupName, setGroupName] = useState("");
  const [showGroupInput, setShowGroupInput] = useState(false);
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [joinGroupName, setJoinGroupName] = useState("");

  const createGroup = () => {
    if (groupName.trim()) {
      if (!groupName) {
        return
      }
      console.log(user.username,groupName);
      socket.emit("create-new-group", {
        sender: user.username,
        groupName
      })
      setGroupName("");
      setShowGroupInput(false);

      socket.on('group-created', newGroup => {
       dispatch(Addgroup(newGroup))
       Addgroup({newGroup.profileImage, newGroup.name})
      })
    }
  };

  const joinGroup = () => {
    if (joinGroupName.trim()) {
      // TODO: Implement group joining logic
      console.log(`Joining group: ${joinGroupName}`);
      setJoinGroupName("");
      setShowJoinInput(false);
    }
  };

  return (
    <>
      <div className="relative tex">
        <div className="flex flex-col py-4 pl-4 pr-2 w-[42vh] bg-white flex-shrink-0">
         
          <div className="h-10 mt-2 bg-red-200">
            <input
              className="h-full w-full outline-none border-[1px] border-[#000] p-2 rounded-md"
              type="text"
              placeholder="Serach user..."
            />
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {activeUsers && activeUsers.length}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              {activeUsers &&
                activeUsers.map((user) => {
                  return (
                    <div
                      key={user._id}
                      onClick={() => {
                        fetchMessages(user);
                        setchatPartner(user);
                      }}
                    >
                      <UserChatCard
                        key={user._id}
                        username={user.username}
                        image={user.image.url}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="group flex flex-col items-center justify-between text-xs mt-6">
              <div className="w-full flex justify-between items-center">
                <span className="font-bold">Groups</span>
                <div className="flex items-center">
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full mr-2">
                    7
                  </span>
                  <button
                    onClick={() => {
                      setShowGroupInput(!showGroupInput);
                      setShowJoinInput(false);
                    }}
                    className="text-blue-500 hover:text-blue-600 focus:outline-none mr-2"
                  >
                    <IoAddOutline size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setShowJoinInput(!showJoinInput);
                      setShowGroupInput(false);
                    }}
                    className="text-green-500 hover:text-green-600 focus:outline-none"
                  >
                    <MdGroup size={20} />
                  </button>
                </div>
              </div>
              {showGroupInput && (
                <div className="w-full mt-2 flex">
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="flex-grow p-2 text-sm border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={createGroup}
                    className="bg-blue-500 text-white px-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Create
                  </button>
                </div>
              )}
              {showJoinInput && (
                <div className="w-full mt-2 flex">
                  <input
                    type="text"
                    placeholder="Enter group name to join"
                    value={joinGroupName}
                    onChange={(e) => setJoinGroupName(e.target.value)}
                    className="flex-grow p-2 text-sm border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={joinGroup}
                    className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
            <div className="max-h-[34vh] bg-slate-500 overflow-y-auto flex flex-col space-y-1 mt-4 -mx-2">
              <UserChatCard username={"amit"} />
              <UserChatCard username={"amit"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUserLeftNav;
