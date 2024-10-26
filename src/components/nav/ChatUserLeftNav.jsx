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
  const { activeUsers, groups } = useSelector((state) => state.userReducer);
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
        return;
      }
      console.log(user.username, groupName);
      socket.emit("create-new-group", {
        sender: user.username,
        groupName,
      });
      setGroupName("");
      setShowGroupInput(false);

      socket.on("group-created", (newGroup) => {
        console.log(newGroup);
        
        dispatch(
          Addgroup({
            image: { url: newGroup.profileImage },
            name: newGroup.name,
          })
        );
      });
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
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col py-6 px-4 w-80 bg-white shadow-lg h-full">
        <div className="mb-6">
          <div className="relative">
            <input
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              type="text"
              placeholder="Search users..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoSearchOutline className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Active Conversations</h2>
              <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {activeUsers && activeUsers.length}
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {activeUsers &&
                activeUsers.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => {
                      fetchMessages(user);
                      setchatPartner(user);
                    }}
                    className="cursor-pointer hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
                  >
                    <UserChatCard
                      username={user.username}
                      image={user.image.url}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Groups</h2>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                  {groups.length}
                </span>
                <button
                  onClick={() => {
                    setShowGroupInput(!showGroupInput);
                    setShowJoinInput(false);
                  }}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none"
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
              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="flex-grow p-2 text-sm border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={createGroup}
                    className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}

            {showJoinInput && (
              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter group name to join"
                    value={joinGroupName}
                    onChange={(e) => setJoinGroupName(e.target.value)}
                    className="flex-grow p-2 text-sm border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={joinGroup}
                    className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    Join
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {groups.length > 0 &&
                groups.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => {
                      fetchMessages(user);
                      setchatPartner(user);
                    }}
                    className="cursor-pointer hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
                  >
                    <UserChatCard
                      username={user.name}
                      image={user.image}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUserLeftNav;
