import { BellOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Typography,
} from "antd";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const { Header } = Layout;

const HeaderMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const date = new Date();

  const items = [
    { label: <NavLink to="/me">Profile</NavLink>, key: "profile" },
    { label: <NavLink to="/settings">Settings</NavLink>, key: "settings" },
    { type: "divider" as const },
    {
      label: <Button onClick={() => dispatch(logout())}>Logout</Button>,
      key: "logout",
    },
  ];

  const notificationMenu = (
    <Menu>
      <Menu.Item>
        <Typography.Text>Demo</Typography.Text>
      </Menu.Item>
      <Divider />
      <Flex justify="center">
        <Button type="primary">
          <Link to="/">Show all</Link>
        </Button>
      </Flex>
    </Menu>
  );

  return (
    <Header
      style={{ position: "sticky", top: 0, zIndex: 99, width: "100%" }}
      className="flex items-center gap-1 md:gap-5 justify-between"
    >
      <div className="flex items-center md:px-8 text-white justify-center">
        <h3 className="text-sm md:font-bold md:text-2xl lg:text-3xl capitalize text-primary">
          Hello {user?.role || "Guest"},
        </h3>
        {user?.role && (
          <small className="hidden md:block mt-3 md:mr-3 md:font-bold md:text-lg text-[#00A9EA]">
            {user.role}
          </small>
        )}
        <p className="hidden md:block lg:mt-3">{date.toDateString()}</p>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <Dropdown overlay={notificationMenu} trigger={["click"]}>
          <Badge count={3} size="small" offset={[10, 0]}>
            <Avatar
              alt="notifications"
              icon={<BellOutlined />}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          </Badge>
        </Dropdown>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              alt="avatar"
              icon={<UserOutlined />}
              size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 56, xxl: 60 }}
            />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderMenu;
