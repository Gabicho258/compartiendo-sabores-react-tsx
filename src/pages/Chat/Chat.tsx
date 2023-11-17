import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_Chat.scss";
import { NavBar } from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { users } from "../../static_test/users";
import { messages } from "../../static_test/message";


export const Chat = () => {
  const [friend, setFriend] = useState("");

  const openChat = (friend: string)=> {
    setFriend(friend);
  }

  return (
    <>
        <NavBar />
        <div className="chat__container">
          <div className="chat__friends">
            <h2>CHATS</h2>
            <div className="chat__friends-names">
              {users.map((user) => 
              <div className="chat__friends-names-n" 
                onClick={()=>{openChat(`${user.first_name} ${user.last_name}`)}}
                ><img src={user.photo_url}></img> {user.first_name} {user.last_name}
                </div>)}
            </div>
          </div>
          <div className="chat__message">
            {messages.map(message => <p>{message.text} {message.createdAt}</p>)}
          </div>
            <p>Chat con {friend}</p>
        </div>
        
    </>
  );
};

/*
//chat
{
  _id:"6553e5e36c6abba35544443a",
  createdAt:"2023-11-14T21:25:55.244+00:00",
  updatedAt:"2023-11-14T21:25:55.244+00:00",
  __v: 0
}
// message
{
    "chat_id": "6553e5e36c6abba35544443a",
    "sender_id": "6556d849f499af5f3cc92a0b",
    "text": "Hola amigo",
    "_id": "6557bf6f9e964f5f2d28e794",
    "createdAt": "2023-11-17T19:30:55.609Z",
    "updatedAt": "2023-11-17T19:30:55.609Z",
    "__v": 0
}
{
    "chat_id": "6553e5e36c6abba35544443a",
    "sender_id": "6556d849f499af5f3cc92a0b",
    "text": "Hola amigo2",
    "_id": "6557bfbb9e964f5f2d28e796",
    "createdAt": "2023-11-17T19:32:11.821Z",
    "updatedAt": "2023-11-17T19:32:11.821Z",
    "__v": 0
}
{
    "chat_id": "6553e5e36c6abba35544443a",
    "sender_id": "6556d849f499af5f3cc92a0b",
    "text": "¿Como estás?",

    "_id": "6557bfd39e964f5f2d28e798",
    "createdAt": "2023-11-17T19:32:35.826Z",
    "updatedAt": "2023-11-17T19:32:35.826Z",
    "__v": 0
}
*/