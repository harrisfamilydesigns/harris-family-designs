import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../api';
import { AppstoreOutlined, DashboardOutlined, DollarCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined, SolutionOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const { Sider, Content, Footer, Header } = Layout;

const LoggedInLayout = () => {
  // const [current, setCurrent] = React.useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  const isActiveItem = (item) => {
    if (item.type === 'group') {
      return item.children.some(child => isActiveItem(child));
    }
    return location.pathname.includes(item.key);
  }

  const siderMenuItems = [
    {
      key: 'customer',
      icon: 'user',
      label: !collapsed && 'Customer',
      type: 'group',
      children: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: <DashboardOutlined />,
          onClick: () => navigate('/'),
        },
        {
          key: 'orders',
          label: 'Orders',
          icon: <ShoppingCartOutlined />,
          onClick: () => navigate('/orders'),
        },
        {
          key: 'subscription',
          label: 'Subscription',
          icon: <DollarCircleOutlined />,
          onClick: () => navigate('/subscription'),
        },
        {
          key: 'thrifters',
          label: 'My Thrifters',
          icon: <TeamOutlined />,
          onClick: () => navigate('/thrifters'),
        },
      ]
    },
    {
      key: 'thrift',
      icon: 'user',
      label: !collapsed && 'Thrift',
      type: 'group',
      children: [
        {
          key: 'thrift/onboarding',
          label: 'Onboarding',
          icon: <SolutionOutlined />,
          onClick: () => navigate('/thrift/onboarding'),
        },
        {
          key: 'inventory',
          label: 'Inventory',
          icon: <AppstoreOutlined />,
          onClick: () => navigate('/inventory'),
        },
        {
          key: 'customers',
          label: 'My Customers',
          icon: <UsergroupAddOutlined />,
          onClick: () => navigate('/customers'),
        },
      ]
    },
  ]

  let siderActiveKeys = siderMenuItems.filter(item => {
    if (item.type === 'group') {
      return item.children.some(child => isActiveItem(child));
    }
    return isActiveItem(item);
  }).map(item => {
    if (item.type === 'group') {
      return item.children.filter(child => isActiveItem(child)).map(child => child.key);
    }
    return item.key;
  }).flat();

  siderActiveKeys = siderActiveKeys.length ? siderActiveKeys : ['dashboard'];

  const headerMenuItems = [
    {
      key: 'account',
      label: <Link to="/account">My Account</Link>,
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: () => logout(),
    }
  ]

  const headerActiveKeys = headerMenuItems.filter(item => isActiveItem(item)).map(item => item.key);

  const logout = async () => {
    await auth.logout();
    navigate('/login');
  }

  const siderBorderRight = '1px solid #f0f0f0';

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
        collapsed={collapsed}
        trigger={null}
        breakpoint='lg'
        onBreakpoint={broken => setCollapsed(broken)}
        theme='light'
      >
        <div style={{
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRight: siderBorderRight,
          padding: collapsed ? '10px 0' : '10px 10px 0 0'
        }}>
          <Button type='text' size='large' onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu
          defaultSelectedKeys={siderActiveKeys}
          selectedKeys={siderActiveKeys}
          style={{ borderRight: siderBorderRight }}
          items={[
            ...siderMenuItems
          ]}
        >
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: 'transparent', padding: 0}}>
          <Menu
            theme='light'
            mode="horizontal"
            selectedKeys={headerActiveKeys}
            items={headerMenuItems}
            style={{display: 'flex', justifyContent: 'flex-end', flex: 1, paddingRight: 20}}
          />
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>2ndHandFix ©{new Date().getFullYear()} Created by You</Footer>
      </Layout>
    </Layout>
  );
}

export default LoggedInLayout;
