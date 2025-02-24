import React from "react";
import Main from "./components/Main/Main";
import Search from "./components/Search/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Message from "./components/Message/Message";
import { UserProvider } from "./firebase/UserContext";
import GoogleLogin from "./firebase/GoogleLogin";
import ProfileUserOther from "./components/ProfileUserOther/ProfileUserOther";
import Bookmark from "./components/Bookmarks/bookmark";
import Subscribe from "./components/subs/Subscribe";
import Subscribe2 from "./components/subs/Subscribe2";
import Subscribe2OtherUser from "./components/subs/Subscribe2OtherUser";

const App = () => {
  return (
    <div>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/auth" element={<GoogleLogin />} />
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sub/:id" element={<Subscribe />} />
            <Route path="/sub2/:id" element={<Subscribe2 />} />
            <Route path="/sub3/:id" element={<Subscribe2OtherUser />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/message/:googleId" element={<Message />} />
            <Route path="/profile/:email" element={<ProfileUserOther />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
};

export default App;
