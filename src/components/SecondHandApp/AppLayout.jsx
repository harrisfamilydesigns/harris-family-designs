import React from 'react'
import { Layout, Button, Menu } from 'antd';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { auth, tokenProvider } from '../../api';

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const token = tokenProvider.getToken();
  const [current, setCurrent] = React.useState(token ? 'dashboard' : 'login');
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const pathKeyMap = {
      '/': 'dashboard',
      '/login': 'login',
      '/register': 'register',
    };
    setCurrent(pathKeyMap[location.pathname] || 'dashboard');
  }, [location]);

  const menuItems = token ? [
    {
      key: 'dashboard',
      label: <Link to="/">Dashboard</Link>,
    }
  ] : [
    {
      key: 'login',
      label: <Link to="/login">Login</Link>,
    },
    {
      key: 'register',
      label: <Link to="/register">Register</Link>,
    }
  ]

  const logout = async () => {
    await auth.logout();
    navigate('/login');
  }

  const handleMenuSelect = (key) => {
    setCurrent(key);
    navigate(key);
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
          onClick={e => handleMenuSelect(e.key)}
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          style={{flex: 1}}
        />
        {token && (
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
