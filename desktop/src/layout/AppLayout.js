import React, { useState } from 'react';
import { UploadOutlined, AreaChartOutlined, UsergroupAddOutlined, CalendarOutlined, HistoryOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthProvider';

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
    const [collapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[window.location.pathname]} // Устанавливаем активный пункт меню на основе текущего пути
                    items={[
                        {
                            key: '/dashboard',
                            icon: <AreaChartOutlined />,
                            label: <a href="/dashboard">Dashboard</a>,
                        },
                        {
                            key: '/schedule',
                            icon: <CalendarOutlined />,
                            label: <a href="/schedule">Расписание</a>,
                        },
                        {
                            key: '/history-of-orders',
                            icon: <HistoryOutlined />,
                            label: <a href="/history-of-orders">История заказов</a>,
                        },
                        {
                            key: '/b2b-clients',
                            icon: <UploadOutlined />,
                            label: <a href="/b2b-clients">B2B</a>,
                        },
                        {
                            key: '/employees',
                            icon: <UsergroupAddOutlined />,
                            label: <a href="/employees">Сотрудники</a>,
                        },
                        {
                            key: '/settings',
                            icon: <SettingOutlined />,
                            label: <a href="/settings">Настройки</a>,
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
