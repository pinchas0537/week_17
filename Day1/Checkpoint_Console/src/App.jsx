import Login from "./components/Login";
import React, { useState } from 'react'
import UserContext from "./contexts/UserContext";
import Button from "./components/Button"
import Status from "./components/Status";
import { Route, Routes } from "react-router";
import Home from "./components/Home";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (<>
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="status" element={<Status/>}/>
      </Routes>
    </UserContext.Provider>
  </>
  )
}