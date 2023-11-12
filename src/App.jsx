import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import MyWallet from "./pages/MyWallet";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUsers(user);
      } else {
        // user is signed out
        // ...
      }
    });
  }, []);
  return (
    <>
      <Navbar users={users} />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home users={users} />} />
        <Route path="/cart" element={<Basket />} />
        <Route path="/wallet" element={<MyWallet />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
}

export default App;
