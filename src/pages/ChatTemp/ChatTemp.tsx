import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  description: string;
  photo_url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Chat {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export const ChatTemp = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState<User>({
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    description: "",
    photo_url: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [myChats, setMyChats] = useState<Chat[]>([]);
  const requestUser = axios.create({
    baseURL: "http://localhost:5000/api/user",
  });
  const requestChat = axios.create({
    baseURL: "http://localhost:5000/api/chat",
  });

  const handleInputChange = (value: string) => {
    setId(value);
  };
  const getData = async (id: string) => {
    const { data } = await requestUser.get(`/${id}`);
    setUser(data);
    requestChat.get(`/${id}`).then(({ data }) => {
      setMyChats(data);
    });
    console.log(data);
  };
  const createChat = async (id: string, _id: string) => {
    const { data } = await requestChat.post(`/create`, {
      owner_id: id,
      friend_id: _id,
    });
    console.log(data);
  };

  useEffect(() => {
    requestUser.get("/").then(({ data }) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      <label>Enter your ID</label>
      <input
        type="text"
        value={id}
        onChange={({ target }) => {
          handleInputChange(target.value);
        }}
      />
      <button
        onClick={() => {
          getData(id);
        }}
      >
        GetData
      </button>
      <div>
        You are logged as:
        <br />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        Existing users in DB
        <br />
        {users.map(({ _id, first_name }) => (
          <button
            key={_id}
            onClick={() => {
              createChat(id, _id);
            }}
          >
            {first_name}
          </button>
        ))}
      </div>
      <hr />
      <div>Your chats</div>
      {/* declarar interface */}
      {myChats.length !== 0 &&
        myChats.map(({ _id, members }: Chat) => {
          const friendID = members.find((memberID) => memberID !== id);
          const friend = users.filter(
            (user: { _id: string }) => user._id === friendID
          );
          console.log(friend);
          return <button key={_id}>Chat con {friend[0].first_name}</button>;
        })}
    </>
  );
};
