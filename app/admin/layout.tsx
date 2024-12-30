"use client"
import { ReactNode } from "react";
import Sidebar from "../components/admin/Sidebar";
import { useAppSelector } from "../redux/hooks";
import { store } from "../redux/store";
import { useSession } from "next-auth/react";
import Login from "../components/admin/Login";
import Loader from "../components/admin/Loader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isLoading = useAppSelector(store=> store.loadingReducer);
  const {data:session}=useSession();
  if(session?.user?.email!=="ohhdank2@gmail.com"){
    return <Login/>;
  }
  return (
    <div className="flex">
      <Sidebar />
      {children}
      {isLoading && <Loader/>}
    </div>
  );
};

export default Layout;
