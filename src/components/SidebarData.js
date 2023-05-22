import React from "react";
import { AiOutlineLogout, AiFillDashboard } from "react-icons/ai";
import { IoIosPaper, IoIosWallet } from "react-icons/io";

export const SidebarData = [
  {
    title: "My Profile",
    path: "/profile",
    icon: <AiFillDashboard fontSize="20px" />,
    cName: "nav-text",
  },
  {
    title: "Buy Content",
    path: "/buy-content",
    icon: <IoIosWallet fontSize="20px" />,
    cName: "nav-text",
  },
  {
    title: "Purchased Content",
    path: "/purchased-content",
    icon: <IoIosPaper fontSize="20px" />,
    cName: "nav-text",
  },

  {
    title: "Logout",
    path: "/",
    icon: <AiOutlineLogout fontSize="20px" />,
    cName: "nav-text",
  },
];
