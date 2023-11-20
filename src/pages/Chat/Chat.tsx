import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_Chat.scss";
import { NavBar } from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { users } from "../../static_test/users";
import { messages } from "../../static_test/message";

interface Friend{
  name:string;
  image:string;
}
interface Mensaje {
  isFriend: boolean;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export const Chat = () => {
  const [friend, setFriend] = useState<Friend>({
    name:'',
    image:'',
  });

  const openChat = (n: string, img: string)=> {
    setFriend({
      name:n,
      image:img,
    });
  }

  const [mensajesOrdenados, setMensajesOrdenados] = useState<Mensaje[]>([]);

  useEffect(() => {
    const mensajesOrdenados = [...messages].sort((a, b) => {
      const fechaA = new Date(a.createdAt).getTime();
      const fechaB = new Date(b.createdAt).getTime();
      return fechaA - fechaB;
    });

    setMensajesOrdenados(mensajesOrdenados);
  }, []);

  console.log(mensajesOrdenados)

  const newDate = (data: string) =>{
    const dateMongoDB = new Date(data);
    const year = dateMongoDB.getFullYear();
    const month = dateMongoDB.getMonth() + 1; // Meses en JavaScript son 0-indexados
    const day = dateMongoDB.getDate();
    const hour = dateMongoDB.getHours();
    const minute = dateMongoDB.getMinutes();
    const second = dateMongoDB.getSeconds();
    console.log(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
    return {
      year,
      month,
      day,
      hour,
      minute,
      second
    };
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
                onClick={()=>{openChat(`${user.first_name} ${user.last_name}`,`${user.photo_url}` )}}
                ><img className="chat__friends-names-n-i" src={user.photo_url}></img> {user.first_name} {user.last_name}
                </div>)}
            </div>
          </div>
          <div className="chat__message">
            <div className="chat__message-friend">
              <img  className="chat__message-friend-i" src={friend.image}></img><h2>{friend.name}</h2> 
            </div>
            <div className="chat__message-chat" >
                <div className="chat__message-chat-c" >
                  {mensajesOrdenados.map((mensaje, index) => (
                    <div key={index}>
                      {mensaje.isFriend ? (
                      <div className="chat__message-chat-c-m1" >
                        <div className="chat__message-chat-c-m1-p">
                          <p>{mensaje.text} {newDate(mensaje.createdAt).hour}:{newDate(mensaje.createdAt).minute}</p>
                        </div>
                      </div>
                      ) : (
                      <div className="chat__message-chat-c-m2" >
                        <div className="chat__message-chat-c-m2-p">
                          <p>{mensaje.text} {newDate(mensaje.createdAt).hour}:{newDate(mensaje.createdAt).minute}</p>
                        </div>
                      </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="chat__message-chat-b">
                  <input className="chat__message-chat-b-in" ></input> 
                  <img className="chat__message-chat-b-i" src="https://cdn.pixabay.com/photo/2016/07/12/21/00/paper-planes-1513032_1280.png" ></img>
                </div>
            </div>
          </div>
            
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