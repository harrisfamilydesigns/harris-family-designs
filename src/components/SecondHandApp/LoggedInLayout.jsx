import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../api';
import SearchParamsAlert from '../shared/SearchParamsAlert';

const { Sider, Content, Footer } = Layout;

const LoggedInLayout = () => {
  const [current, setCurrent] = React.useState('dashboard');
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'account',
      label: <Link to="/account">My Account</Link>,
    },
    {
      key: 'customer',
      icon: 'user',
      label: 'Customer',
      type: 'group',
      children: [
        {
          key: 'dashboard',
          label: <Link to="/">Dashboard</Link>,
        },
        {
          key: 'orders',
          label: <Link to="/orders">Orders</Link>,
        },
        {
          key: 'subscription',
          label: <Link to="/subscription">Subscription</Link>,
        },
        {
          key: 'thrifters',
          label: <Link to="/thrifters">My Thrifters</Link>,
        },
      ]
    },
    {
      key: 'thrift',
      icon: 'user',
      label: 'Thrift',
      type: 'group',
      children: [
        {
          key: 'inventory',
          label: <Link to="/inventory">My Inventory</Link>,
        },
        {
          key: 'customers',
          label: <Link to="/customers">My Customers</Link>,
        },
      ]
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: () => logout(),
      style: {
        position: 'absolute',
        bottom: 0,

      }
    }
  ]

  React.useEffect(() => {
    const pathKeyMap = {
      '/': 'dashboard',
      '/orders': 'orders',
      '/subscription': 'subscription',
      '/thrifters': 'thrifters',
      '/inventory': 'inventory',
      '/customers': 'customers',
      '/account': 'account',
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
          // theme="dark"
          defaultSelectedKeys={[current]}
          selectedKeys={[current]}
          style={{ height: '100%', boxShadow: '2px 0px 5px 0px rgba(0,0,0,0.25)'}}
          items={menuItems}
        >
        </Menu>
      </Sider>

      <Layout>
        <Content
          style={{
            // margin: '24px 16px',
            // padding: 24,
            // minHeight: 280,
          }}
        >
          <SearchParamsAlert />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>2ndHandFix ©{new Date().getFullYear()} Created by You</Footer>
      </Layout>
    </Layout>
  );
}

export default LoggedInLayout;
