import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../../api';

const { Sider, Content, Footer } = Layout;

const LoggedInLayout = () => {
  const [current, setCurrent] = React.useState('dashboard');
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: 'dashboard',
      label: <Link to="/">Dashboard</Link>,
    }
  ]

  React.useEffect(() => {
    const pathKeyMap = {
      '/': 'dashboard',
    };
    setCurrent(pathKeyMap[location.pathname] || 'dashboard');
  }, [location]);

  const logout = async () => {
    await auth.logout();
    navigate('/login');
  }

  // Antd Sider layout, no header
  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <Sider
        collapsible
        collapsedWidth={0}
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[current]}
          style={{ height: '100%', borderRight: 0 }}
          items={[
            ...menuItems,
            // logout should be on the bottom
            {
              key: 'logout',
              label: 'Logout',
              onClick: logout,
            }
          ]}
        >
        </Menu>
      </Sider>

      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>2ndHandFix ©{new Date().getFullYear()} Created by You</Footer>
      </Layout>
    </Layout>
  );
}

export default LoggedInLayout;
