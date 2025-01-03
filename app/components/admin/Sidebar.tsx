"use client";
import {
  LayoutDashboard,
  ShoppingCart,
  UserCog,
  ArrowLeftRight,
  BarChart,
  Settings,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/public/icon.png";
import { usePathname } from "next/navigation";

const menu = [
  { icon: <LayoutDashboard />, name: "Dashboard", link: "dashboard" },
  { icon: <ShoppingCart />, name: "Products", link: "products" },
  { icon: <UserCog />, name: "Accounts", link: "accounts" },
  { icon: <ArrowLeftRight />, name: "Transactions", link: "/transactions" },
  { icon: <BarChart />, name: "Analytics", link: "analytics" },
  { icon: <Settings />, name: "Settings", link: "settings" },
];

const Sidebar = () => {
  const pathname = usePathname();
  {
    console.log(pathname);
  }
  return (
    <div className="h-screen bg-green-100 w-80 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-200 transition-all duration-300 ease-in-out">
      <Image src={Icon} alt="Icon" height={500} width={500} />
      <div className="flex flex-col items-center gap-6 m-4">
        {menu.map((item, index) => (
          <Link
            className={`text-black flex p-4 gap-2 w-44 items-center justify-center h-12 text-xl rounded-3xl transition-all duration-300 ease-in-out ${
              pathname.endsWith(item.link)
                ? `bg-green-700`
                : `bg-green-500 hover:bg-green-300`
            }`}
            href={item.link}
            key={index}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
