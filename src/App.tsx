import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Categories } from "./pages/Categories/Categories";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { Chat } from "./pages/Chat/Chat";
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
        <Route path="/chat" element={<Chat />} />
        <Route path="/category/:category" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
