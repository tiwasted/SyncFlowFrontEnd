import React from "react";
import {
  // UploadOutlined,
  AreaChartOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  HistoryOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import iconTab from './iconTab.svg';


const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
                <img src={iconTab} alt="Icon" style={{ width: 30, height: 30, marginLeft: 48 }} />

        <div className="header-title">StaffHub</div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[window.location.pathname]}
          style={{ flex: 1, justifyContent: "flex-end", paddingRight: 100 }} // Центрируем меню
          items={[
            {
              key: "/dashboard",
              icon: <AreaChartOutlined />,
              label: <a href="/dashboard">Dashboard</a>,
            },
            {
              key: "/schedule",
              icon: <CalendarOutlined />,
              label: <a href="/schedule">Расписание</a>,
            },
            {
              key: "/history-of-orders",
              icon: <HistoryOutlined />,
              label: <a href="/history-of-orders">История заказов</a>,
            },
            // {
            //   key: "/b2b-clients",
            //   icon: <UploadOutlined />,
            //   label: <a href="/b2b-clients">B2B</a>,
            // },
            {
              key: "/employees",
              icon: <UsergroupAddOutlined />,
              label: <a href="/employees">Сотрудники</a>,
            },
            {
              key: "/settings",
              icon: <SettingOutlined />,
              label: <a href="/settings">Настройки</a>,
            },
          ]}
        />
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{
            marginRight: "40px",
          }}
        >
          Выйти
        </Button>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          flex: 1,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: "center",
          background: colorBgContainer,
          padding: "16px 50px",
          borderRadius: borderRadiusLG,
        }}
      >
        © 2024 StaffHub
      </Footer>
    </Layout>
  );
};

export default AppLayout;
