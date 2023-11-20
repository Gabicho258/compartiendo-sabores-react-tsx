import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Categories } from "./pages/Categories/Categories";
import { UserProfile } from "./pages/UserProfile/UserProfile";

import { EditProfile } from "./pages/EditProfile/EditProfile";
import { Recipe } from "./pages/Recipe/Recipe";


import { Chat } from "./pages/Chat/Chat";
import { CreateRecipe } from "./pages/CreateRecipe/CreateRecipe";

import { ChatTemp } from "./pages/ChatTemp/ChatTemp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/edit-profile" element={<EditProfile />} />


        <Route path="/chat" element={<Chat />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />

        <Route path="/chat-temp" element={<ChatTemp />} />


        <Route path="/category/:category" element={<Categories />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
