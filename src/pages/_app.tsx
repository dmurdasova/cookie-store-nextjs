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
import '../styles/global.scss';

const { Header, Sider, Footer, Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const router = useRouter();

    const handleMenuChange = ({ key }: SelectInfo): void => {
        router.push(`/${key.toLowerCase()}`);
    };

    const selected = router.route;

    return (
        <Layout className="layout" hasSider={true}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[selected]}
                    onSelect={handleMenuChange}
                    items={[
                        {
                            key: '/',
                            icon: <UserOutlined />,
                            label: 'Main'
                        },
                        {
                            key: '/about',
                            icon: <VideoCameraOutlined />,
                            label: 'About'
                        }
                    ]}
                />
            </Sider>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0
                    }}>
                    <div className="header-content">
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed)
                        })}
                        <span className="header-content__title">Welcome to our cookie store</span>
                    </div>
                </Header>

                <Content className="site-layout__content">
                    <Component {...pageProps} />
                </Content>

                <FloatButton.BackTop />

                <Footer style={{ textAlign: 'center' }}>
                    Cookie Store ©2023 Created by Diana Murdasova
                </Footer>
            </Layout>
        </Layout>
    );
}
