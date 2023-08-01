import { useState } from "react";
import CompletedOrder from "./CompletedOrder";
import PendingOrder from "./PendingOrder";
import ServedOrder from "./ServedOrder";
import SideBar from "./SideBar";

const DashboardHome = () => {
  const [activeMenu, setActiveMenu] = useState("PendingOrder");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  let mainContent;
  let headerContent;

  if (activeMenu === "PendingOrder") {
    mainContent = <PendingOrder />;
    headerContent = "Pending Orders";
  } else if (activeMenu === "ServedOrder") {
    mainContent = <ServedOrder />;
    headerContent = "Served Orders";
  } else if (activeMenu === "CompletedOrder") {
    mainContent = <CompletedOrder />;
    headerContent = "Completed Order";
  }

  return (
    <div className="flex  flex-col lg:flex-row">
      <div className="h-screen lg:w-1/8 drawer-overlay overflow-y-auto">
        {/* Sidebar content goes here */}
        <SideBar activeMenu={activeMenu} onMenuClick={handleMenuClick} />
      </div>

      <div className="bg-gray-200 flex-grow ">
        <header className="bg-blue-200 shadow-md h-8 p-1">
          <h1 className="text-blue-800 font-bold text-sm">{headerContent}</h1>
        </header>

        <main className="p-4">{mainContent}</main>
      </div>
    </div>
  );
};

export default DashboardHome;
