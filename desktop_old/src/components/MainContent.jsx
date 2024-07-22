import React from 'react';
import { Layout } from 'antd';

import Menu from './layout/Menu';
import Navbar from './layout/Navbar';
import OrderList from './dashboard/OrderList';

import '../index.css';

const { Sider, Content } = Layout;

const MainContent = ({ onLogout }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
                <Navbar onLogout={onLogout} />
            <Layout>
                <Sider width={200} className="site-layout-background">
                <Menu />
                </Sider>
                <Layout style={{ marginLeft: 50, padding: '24px 24px 0' }}>
                <Content
                    className="site-layout-background"
                    style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 20,
                    }}
                >
                    <OrderList />
                </Content>
                </Layout>
            </Layout>

                <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
                    <span class=" text-gray-500 sm:text-center dark:text-gray-400">© 2024 SyncFlow
                    </span>
                    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    </ul>
                    </div>
                </footer>

            </Layout>
    );
};

export default MainContent;

