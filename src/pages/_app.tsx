import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { FloatButton, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { SelectInfo } from 'rc-menu/lib/interface';
import React from 'react';
import { useState } from 'react';

const { Header, Sider, Footer } = Layout;

export default function App({ Component, pageProps }: AppProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const router = useRouter();

    const handleMenuChange = ({ key }: SelectInfo): void => {
        console.log(key);
        router.push(`/${key.toLowerCase()}`);
    };

    return (
        <Layout className="layout">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onSelect={handleMenuChange}
                    items={[
                        {
                            key: '',
                            icon: <UserOutlined />,
                            label: 'Main'
                        },
                        {
                            key: 'about',
                            icon: <VideoCameraOutlined />,
                            label: 'About'
                        }
                    ]}
                />
            </Sider>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background header-content"
                    style={{
                        padding: 0
                    }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed)
                    })}
                    Welcome to our cookie store
                </Header>

                <Component {...pageProps} />

                <FloatButton.BackTop />

                <Footer style={{ textAlign: 'center' }}>
                    Cookie Store ©2023 Created by Diana Murdasova
                </Footer>
            </Layout>
        </Layout>
    );
}
