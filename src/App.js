import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import Dashboard from "./pages/Dashboard";
import store from "./store";
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
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // if (!session) {
  //   return redirect("/");
  // }

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/buy-content" element={<BuyContent />} />
            <Route path="/purchased-content" element={<PurchasedContent />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
