import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemePreferenceContext';

const { Header, Content, Footer } = Layout;

const LoggedOutLayout = () => {
  const [current, setCurrent] = React.useState('login');
  const location = useLocation();
  const { themePreference, setThemePreference } = useTheme()

  React.useEffect(() => {
    const pathKeyMap = {
      '/login': 'login',
      '/register': 'register',
    };
    setCurrent(pathKeyMap[location.pathname] || 'dashboard');
  }, [location]);


  const menuItems = [
    {
      key: 'login',
      label: <Link to="/login">Login</Link>,
    },
    {
      key: 'register',
      label: <Link to="/register">Register</Link>,
    }
  ]

  return (
    <Layout className="layout"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
      theme={themePreference}
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
        theme={themePreference}
      >
        <div className="logo" />
        <Menu
          onClick={e => setCurrent(e.key)}
          theme={themePreference}
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          style={{flex: 1}}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>2ndHandFix ©{new Date().getFullYear()} Created by You</Footer>
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
  );
}

export default LoggedOutLayout;
