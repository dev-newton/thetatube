import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyContent from "./pages/BuyContent";
import PurchasedContent from "./pages/PurchasedContent";

import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      localStorage.setItem("session", JSON.stringify(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      localStorage.setItem("session", JSON.stringify(session));
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login session={session} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Dashboard session={session} />} />
        <Route path="/buy-content" element={<BuyContent session={session} />} />
        <Route
          path="/purchased-content"
          element={<PurchasedContent session={session} />}
        />
      </Routes>
    </>
  );
}

export default App;
