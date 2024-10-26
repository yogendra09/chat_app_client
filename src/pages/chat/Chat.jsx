import React, { useEffect, useCallback, useState } from "react";
import ChatUserLeftNav from "../../components/nav/ChatUserLeftNav";
import SendingMessage from "../../components/message/SendingMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  activeUsers,
  Addgroup,
  removeUser,
  setGroup,
  updateConnection,
} from "../../../store/Reducers/userReducer";
import { socket } from "../../../socket";
import { useNavigate } from "react-router-dom";
import { asyncCurrentUser } from "../../../store/Actions/userAction";
import ChatArea from "../../components/chat/ChatArea";

const Chat = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isAuthenticated,groups } = useSelector((state) => state.userReducer);
  const [displayMsg, setdisplayMsg] = useState([]);
  const [chatPartner, setchatPartner] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleActiveUsers = useCallback((data) => {
    console.log(data);
    dispatch(activeUsers(data.activeUsers));
    dispatch(setGroup(data.allGroups));
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateConnection(true));
    socket.emit("server_joined", { user:user && user.username });

    socket.on("activeUsers", handleActiveUsers);

    socket.emit("group-joined", (group) => {
      console.log(group);
    });

    return () => {
      // socket.off("activeUsers", handleActiveUsers);
    };
  }, [dispatch, user.username, handleActiveUsers]);

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <ChatUserLeftNav
            setdisplayMsg={setdisplayMsg}
            setchatPartner={setchatPartner}
          />
          {chatPartner && (
            <ChatArea
              displayMsg={displayMsg}
              setdisplayMsg={setdisplayMsg}
              chatPartner={chatPartner}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Chat);
