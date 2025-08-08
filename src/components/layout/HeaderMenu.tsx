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
  type MenuProps,
} from "antd";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { useAppDispatch } from "../../redux/hook";
import { Link } from "react-router-dom";
const { Header } = Layout;

const HeaderMenu = () => {
  const { data, refetch: userRefetch } = useGetMeQuery(undefined);
  const dispatch = useAppDispatch();

  const items: MenuProps["items"] = [
    {
      label: <NavLink to={`/me`}>Profile</NavLink>,
      key: "profile",
    },
    {
      label: <NavLink to={`/settings`}>Settings</NavLink>,
      key: "settings",
    },

    {
      type: "divider",
    },
    {
      label: <Button onClick={() => dispatch(logout())}>Logout</Button>,
      key: "logout",
    },
  ];
  const date = new Date();

  // Function to handle dropdown click

  useEffect(() => {
    userRefetch(); // Trigger data refetch on component mount
  }, [data, userRefetch]);

  const notificationMenu = (
    <Menu>
      <Menu.Item>
        <Typography.Text>Demo</Typography.Text>
      </Menu.Item>

      <Divider />
      <Flex justify="center">
        <Button type="primary">
          <Link to="/">show all</Link>
        </Button>
      </Flex>
    </Menu>
  );

  return (
    <Header
      style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      className="flex items-center gap-1 md:gap-5 justify-between"
    >
      <div className="flex items-center md:px-8 text-white justify-center">
        <h3 className="text-sm md:font-bold md:text-2xl lg:text-3xl capitalize text-primary ">
          Hello {data?.data?.name},
        </h3>
        <small className=" hidden md:block mt-3 md:mr-3 md:font-bold md:text-lg text-[#00A9EA]">
          {data?.data?.role}
        </small>
        <p className="hidden md:block lg:mt-3"> {date.toDateString()}</p>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <Dropdown overlay={notificationMenu} trigger={["click"]}>
          <Badge count={3} size="small" offset={[10, 0]}>
            <Avatar
              alt="avatar"
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
