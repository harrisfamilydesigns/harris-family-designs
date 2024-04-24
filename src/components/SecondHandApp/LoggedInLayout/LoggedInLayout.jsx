import React from 'react';
import { Button, Flex, Layout, Menu, Space, Tabs, Typography } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { auth, useCurrentUser, useThrifter } from '../../../api';
import { AppstoreOutlined, CaretDownOutlined, DashboardOutlined, DollarCircleOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShopOutlined, ShoppingCartOutlined, SolutionOutlined, TeamOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import './LoggedInLayout.css';
import logo from '../../../assets/secondhand-logo.webp';

const { Sider, Content, Footer, Header } = Layout;

const LoggedInLayout = () => {
  // const [current, setCurrent] = React.useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const { currentUser, isLoading } = useCurrentUser();
  const { thrifter } = useThrifter(currentUser?.thrifterId);

  const isActiveItem = (item) => {
    if (item.type === 'group') {
      return item.children.some(child => isActiveItem(child));
    }
    return location.pathname.includes(item.key);
  }

  const thrifterMenuItems = thrifter && thrifter.status === 'active' ? [
    {
      key: 'thrifter',
      icon: 'user',
      label: !collapsed && 'Thrifter',
      type: 'group',
      children: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: <DashboardOutlined />,
          onClick: () => navigate('/thrifter/dashboard'),
        },
        {
          key: 'orders',
          label: 'Orders',
          icon: <ShoppingCartOutlined />,
          onClick: () => navigate('/thrifter/orders'),
        },
        {
          key: 'inventory',
          label: 'Inventory',
          icon: <AppstoreOutlined />,
          onClick: () => navigate('/thrifter/inventory'),
        },
        {
          key: 'customers',
          label: 'My Customers',
          icon: <UsergroupAddOutlined />,
          onClick: () => navigate('/thrifter/customers'),
        },
      ]
    }
  ] : [
    {
      key: 'thrifter',
      icon: 'user',
      label: !collapsed && 'Thrifter',
      type: 'group',
      children: [
        {
          key: 'thrifter/onboarding',
          label: 'Thrift with us!',
          icon: <SolutionOutlined />,
          onClick: () => navigate('/thrifter/onboarding'),
        },
      ]
    },
  ];

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
        // {
        //   key: 'orders',
        //   label: 'Orders',
        //   icon: <ShoppingCartOutlined />,
        //   onClick: () => navigate('/orders'),
        // },
        // {
        //   key: 'subscription',
        //   label: 'Subscription',
        //   icon: <DollarCircleOutlined />,
        //   onClick: () => navigate('/subscription'),
        // },
        // {
        //   key: 'thrifters',
        //   label: 'My Thrifters',
        //   icon: <TeamOutlined />,
        //   onClick: () => navigate('/thrifters'),
        // },
      ]
    },
    ...thrifterMenuItems
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
        onBreakpoint={broken => {
          setCollapsed(broken)
          setMobile(broken)
        }}
        style={{
          display: mobile ? 'none' : 'block',
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 100,
        }}
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
          items={siderMenuItems}
        >
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'transparent', padding: 0}}>
          <Flex justify='space-between'>
            <div style={{ background: 'white', display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="2ndHandFix" style={{height: 50, marginLeft: 10, borderRadius: '50%'}} />
              <Typography.Title level={4} style={{margin: 0, marginLeft: 10}}>2ndHandFix</Typography.Title>
            </div>
            <Menu
              theme='light'
              mode="horizontal"
              selectedKeys={isActiveItem({key: 'user'}) ? ['user'] : []}
              style={{flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 20}}
              items={[
                {
                  key: 'user',
                  label: (
                    <Space>
                      {isLoading ? 'Loading...' : currentUser?.email}
                      <CaretDownOutlined />
                    </Space>
                  ),
                  children: [
                    {
                      key: 'account',
                      label: <Link to="/account">Edit</Link>,
                    },
                    {
                      key: 'logout',
                      label: (
                        <Flex align='center' justify='space-between'>
                          Logout
                          <LogoutOutlined />
                        </Flex>
                      ),
                      onClick: logout,
                    },
                  ],
                },
              ]}
            >
            </Menu>
          </Flex>
        </Header>
        <Content>
          <Outlet />
        </Content>
        {
          mobile ? (
            <div style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 100,
              backgroundColor: 'white',
              border: '1px solid #f0f0f0',
              borderTop: 'none',
            }}>
              <Tabs tabPosition='bottom' tabBarStyle={{marginTop: 0}}>
                <Tabs.TabPane
                  tab={
                    <Link to="/">
                      <UserOutlined />
                    </Link>
                  }
                  key="customer"
                />
                <Tabs.TabPane
                  tab={
                    <Link to="/thrifter/onboarding">
                      <ShopOutlined />
                    </Link>
                  }
                  key="thrift"
                />
              </Tabs>
            </div>
          ) : (
            <Footer style={{ textAlign: 'center' }}>2ndHandFix ©{new Date().getFullYear()} Created by You</Footer>
          )
        }
      </Layout>
    </Layout>
  );
}

export default LoggedInLayout;
