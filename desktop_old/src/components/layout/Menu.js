import React, { useState } from 'react';
import { FundOutlined, ScheduleOutlined, HistoryOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const menuItems = [
    {
        key: '1',
        icon: <FundOutlined />,
        label: 'Dashboard',
    },
    {
        key: '2',
        icon: <ScheduleOutlined />,
        label: 'Расписание',
    },
    {
        key: '3',
        icon: <HistoryOutlined />,
        label: 'История заказов',
    },
    {
        key: '4',
        icon: <UsergroupAddOutlined />,
        label: 'Сотрудники',
        children: [
            {
                key: '4.1',
                label: 'Управление сотрудниками',
            },
        ]
    },
];

const App = () => {
    const [selectedKeys, setSelectedKeys] = useState(['1']);

    const handleMenuSelect = ({ key }) => {
        setSelectedKeys([key]);
    };

    return (
        <>
            <Menu
                style={{
                    width: 250,
                    height: '120vh',
                    overflowY: 'auto',
                }}
                selectedKeys={selectedKeys}
                onSelect={handleMenuSelect}
                items={menuItems}
            />
        </>
    );
};

export default App;
