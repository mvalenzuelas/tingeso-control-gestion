import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAuthCheck from "../hooks/useAuthCheck";

const MainLayout = () => {
  const authQuery = useAuthCheck();
  
  return (
    <>
      <Sidebar />
      <div className="main-content flex items-center justify-center bg-white">
        <Outlet />
      </div>
    </>
  )
};

export default MainLayout;
