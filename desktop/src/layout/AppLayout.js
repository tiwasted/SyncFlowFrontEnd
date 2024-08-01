import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, AreaChartOutlined, UsergroupAddOutlined, CalendarOutlined, HistoryOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['location.pathname']}
            items={[
                {
                key: '1',
                icon: <AreaChartOutlined />,
                label: <Link to="/dashboard">Dashboard</Link>,
                },
                {
                key: '2',
                icon: <CalendarOutlined />,
                label: <Link to="/schedule">Расписание</Link>,
                },
                {
                key: '3',
                icon: <HistoryOutlined />,
                label: <Link to="/history-of-orders">История заказов</Link>,
                },
                {
                key: '4',
                icon: <UploadOutlined />,
                label: <Link to="/b2b-clients">B2B</Link>,
                },
                {
                key: '5',
                icon: <UsergroupAddOutlined />,
                label: <Link to="/employees">Сотрудники</Link>,
                },
                {
                key: '6',
                icon: <SettingOutlined />,
                label: <Link to="/settings">Настройки</Link>,
                },
            ]}
            />
        </Sider>
        <Layout>
            <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    }}
                />
                <div className="header-title">StaffHub</div>
                <Button
                            type="primary"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            style={{
                                marginRight: '16px',
                            }}
                        >
                            Выйти
                </Button>
            </Header>
            <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
            >
            {children}
            </Content>
        </Layout>
        </Layout>
    );
};

export default AppLayout;
