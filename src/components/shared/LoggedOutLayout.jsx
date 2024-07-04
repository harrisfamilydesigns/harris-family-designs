import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const LoggedOutLayout = ({ footerLabel }) => {
  const [current, setCurrent] = React.useState('login');
  const location = useLocation();

  React.useEffect(() => {
    console.log('location.pathname', location.pathname)
    if (location.pathname.endsWith('/login')) {
      setCurrent('login');
    } else if (location.pathname.endsWith('/register')) {
      setCurrent('register');
    }
  }, [location]);


  const menuItems = [
    {
      key: 'login',
      label: <Link to="./login">Login</Link>,
    },
    {
      key: 'register',
      label: <Link to="./register">Register</Link>,
    }
  ]

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
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>{footerLabel}</Footer>
    </Layout>
  );
}

export default LoggedOutLayout;
