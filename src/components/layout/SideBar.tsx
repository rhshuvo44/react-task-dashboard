import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRole } from "../../constants/userRole";
import type { RootState } from "../../redux/store";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const SideBar = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const user = useSelector((state: RootState) => state.auth.user);

  let sidebarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    default:
      break;
  }

  const handleOpenChange = (keys: []) => {
    if (openKeys.length == 1) {
      keys.shift();
      setOpenKeys(keys);
      return;
    }
    setOpenKeys(keys);
  };
  return (
    <Sider
      style={{
        // width: "100%",
        height: "100%",
        minHeight: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
      }}
      // width={250}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="m-5">
        {/* <img src={logo} alt="logo" /> */}
        <Link className="text-white text-4xl" to="/">DashTask</Link>
      </div>
      <Menu
        openKeys={openKeys}
        onOpenChange={(keys: string[]) => handleOpenChange(keys as [])}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as []}
      />
    </Sider>
  );
};

export default SideBar;
