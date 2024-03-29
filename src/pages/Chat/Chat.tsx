import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { NavBar } from "../../components/NavBar/NavBar";
//import { useNavigate } from "react-router-dom";
// import { users } from "../../static_test/users";
import "./_Chat.scss";
import "animate.css";
import {
  useCreateMessageMutation,
  useGetChatsByUserIdQuery,
  useGetMessagesByChatIdQuery,
  useGetUsersQuery,
} from "../../app/apis/compartiendoSabores.api";
import { Message, User, Chat as iChat } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const socket = io("http://localhost:5000");

export const Chat = () => {
  const isUserAuthenticated = localStorage.getItem("data");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const [sortMessages, setSortMessages] = useState<Message[]>([]);
  const [friendSelected, setFriendSelected] = useState<User>();
  const [chatSelected, setChatSelected] = useState<iChat>();
  const { data: myChats = [] } = useGetChatsByUserIdQuery(userCredentials.id);
  const { data: users = [] } = useGetUsersQuery();
  const { data: myMessages = [], refetch } = useGetMessagesByChatIdQuery(
    chatSelected?._id || ""
  );
  const [createMessage] = useCreateMessageMutation();
  const conversationRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  };
  const sortData = <T extends Message | iChat>(data: T[]): T[] => {
    const sortedData = [...data].sort((a, b) => {
      const fechaA = new Date(a.updatedAt).getTime();
      const fechaB = new Date(b.updatedAt).getTime();
      return fechaA - fechaB;
    });
    if (data.length > 0 && "members" in data[0]) {
      return sortedData.reverse() as T[];
    }

    return sortedData;
  };
  const myChatsSorted = sortData(myChats);
  const myMessagesSorted = sortData(myMessages);
  const navigate = useNavigate();
  ////////////
  const [form, setForm] = useState<Partial<Message>>({
    text: "",
  });

  const inputForm = (t: string) => {
    setForm({
      text: t,
    });
  };
  const handleSendMessage = async () => {
    const message = {
      ...form,
      chat_id: chatSelected?._id,
      sender_id: userCredentials.id,
    };

    try {
      const response = await createMessage(message).unwrap();
      socket.emit("sendMessagesPrivate", {
        message: response,
        selectUser: friendSelected?._id,
      });
    } catch (error: any) {
      alert(JSON.stringify(error.data));
    }

    setForm({
      text: "",
    });
  };
  const handleOpenChat = async (friend: User, chat: iChat) => {
    setFriendSelected(friend);
    setChatSelected(chat);
    await refetch();
  };

  useEffect(() => {
    // const sortMessages = [...messages].sort((a, b) => {
    //   const fechaA = new Date(a.createdAt).getTime();
    //   const fechaB = new Date(b.createdAt).getTime();
    //   return fechaA - fechaB;
    // });
    // setSortMessages(sortMessages);
  }, []);

  const newDate = (data: string) => {
    const dateMongoDB = new Date(data);
    const year = dateMongoDB.getFullYear();
    const month = dateMongoDB.getMonth() + 1; // Meses en JavaScript son 0-indexados
    const day = dateMongoDB.getDate();
    const hour = dateMongoDB.getHours();
    const minute = dateMongoDB.getMinutes();
    const second = dateMongoDB.getSeconds();
    return {
      year,
      month,
      day,
      hour,
      minute,
      second,
    };
  };
  // Lógica websockets
  const [isConnected, setIsConnected] = useState(false); // puede ser usado para interfaz
  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.emit("register", userCredentials.id);
    socket.on("userExists", () => console.log("User already exists"));
    socket.on("login", () => console.log("Logueado correctamente"));
    // socket.on("chat_message", (data) => {
    //   setMensajes((mensajes) => [...mensajes, data]);
    // });
    socket.on("sendMessage", async (data: any) => {
      await refetch();
      scrollToBottom();
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, []);
  console.log(conversationRef);
  return (
    <>
      <NavBar />
      <div className="chat__container">
        <div className="chat__container-backBtn">
          <ArrowBackIcon
            className="chat__container-backBtn-icon"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="chat__friends">
          <h2 className="chat__friends-chatsLabel">CHATS</h2>
          <div className="chat__friends-names">
            {myChatsSorted.map((chat, index) => {
              const [friendUser] = users?.filter(
                (user) =>
                  user._id ===
                  chat.members.find(
                    (memberId) => memberId !== userCredentials.id
                  )
              );

              return (
                <div
                  key={index}
                  className="chat__friends-names-n"
                  onClick={() => {
                    handleOpenChat(friendUser, chat);
                  }}
                >
                  <img
                    alt={`${friendUser?.first_name} ${friendUser?.last_name}`}
                    className="chat__friends-names-n-i"
                    src={friendUser?.photo_url}
                  ></img>
                  <p>
                    {friendUser?.first_name} {friendUser?.last_name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat__message">
          <div className="chat__message-friend">
            <img
              alt="qweqwe"
              className="chat__message-friend-i"
              src={
                friendSelected?.photo_url || "https://svgsilh.com/svg/98739.svg"
              }
            ></img>
            <h2>
              {friendSelected ? (
                <>
                  {friendSelected?.first_name} {friendSelected?.last_name}
                </>
              ) : (
                "Seleccione un chat para empezar"
              )}
            </h2>
          </div>
          <div className="chat__message-chat">
            {friendSelected ? (
              <>
                <div className="chat__message-chat-c" ref={conversationRef}>
                  {myMessagesSorted.map((message, index) => {
                    const isFriend = message.sender_id !== userCredentials.id;
                    return (
                      <div key={index}>
                        {isFriend ? (
                          <div className="chat__message-chat-c-m1">
                            <div className="chat__message-chat-c-m1-p animate__animated animate__fadeIn">
                              <p>{message.text}</p>
                              <label className="chat__message-chat-c-m1-hour">
                                {newDate(message.createdAt).hour}:
                                {newDate(message.createdAt).minute}
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="chat__message-chat-c-m2">
                            <div className="chat__message-chat-c-m2-p animate__animated animate__fadeIn">
                              <p>{message.text}</p>
                              <label className="chat__message-chat-c-m2-hour">
                                {newDate(message.createdAt).hour}:
                                {newDate(message.createdAt).minute}
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="chat__message-chat-b">
                  <div className="chat__message-chat-b-container">
                    <input
                      value={form.text}
                      className="chat__message-chat-b-container-in"
                      onChange={({ target }) => {
                        inputForm(target.value);
                      }}
                      placeholder="Escribe un mensaje..."
                    />
                  </div>

                  <SendIcon
                    className="chat__message-chat-b-i"
                    onClick={() => {
                      handleSendMessage();
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
