import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  redirect,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyContent from "./pages/BuyContent";
import PurchasedContent from "./pages/PurchasedContent";

import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [session, setSession] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login session={session} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Dashboard session={session} />} />
        <Route path="/buy-content" element={<BuyContent />} />
        <Route path="/purchased-content" element={<PurchasedContent />} />
      </Routes>
    </>
  );
}

export default App;
