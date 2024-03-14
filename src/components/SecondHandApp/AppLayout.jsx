import React from 'react'
import { Layout, Button, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { useCurrentUser, auth } from '../../api';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const { data: currentUser, error, isLoading } = useCurrentUser();
  const [current, setCurrent] = React.useState('home');

  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      link: '/',
    },
  ];

  const navigate = useNavigate();
  const logout = async () => {
    await auth.logout();
    navigate('/login');
  }

  return (
    <Layout className="layout"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="logo" />
        <Menu
          onClick={e => setCurrent(e.key)}
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          style={{flex: 1}}
        />
        {currentUser && (
          <Button type="primary" onClick={logout}>Logout</Button>
        )}
      </Header>
      <Content style={{padding: '0 50px'}}>
        <Outlet />
      </Content>
      {/* <Footer
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Contact us at info@harrisfamilydesigns.com
      </Footer> */}
    </Layout>
  )
}

export default AppLayout;
