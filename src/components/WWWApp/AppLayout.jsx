import React from 'react'
import { Layout, Menu } from 'antd';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
import { auth, tokenProvider } from '../../api';
import { useTheme } from '../../contexts/ThemePreferenceContext';

const AppLayout = () => {
  const [current, setCurrent] = React.useState('about');
  const token = tokenProvider.getToken();
  const location = useLocation();
  const navigate = useNavigate();
  const { themePreference, setThemePreference } = useTheme();

  React.useEffect(() => {
    const pathKeyMap = {
      '/about': 'about',
      '/products': 'product',
      '/contact': 'contact',
      '/admin': 'admin',
    };
    setCurrent(pathKeyMap[location.pathname] || 'about');
  }, [location]);

  const handleLogout = () => {
    auth.logout();
    navigate('/'); // Redirect to home
  };

  let menuItems = [
    {
      key: 'about',
      label: <Link to="/about">About Us</Link>,
    },
    {
      key: 'product',
      label: <Link to="/products">Our Products</Link>,
    },
    {
      key: 'contact',
      label: <Link to="/contact">Contact Us</Link>,
    },
  ];

  if (token) {
    menuItems.push({
      key: 'admin',
      label: <Link to="/admin">Admin</Link>,
    });

    menuItems.push({
      key: 'logout',
      label: 'Logout',
      onClick: handleLogout,
    });
  }

  return (
    <Layout
      className="layout"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        textAlign: 'center'
      }}
    >
      <Header>
        <div className="logo" />
        <Menu onClick={e => setCurrent(e.key)} theme={themePreference} mode="horizontal" selectedKeys={[current]} items={menuItems} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Contact us at info@harrisfamilydesigns.com
      </Footer>
    </Layout>
  )
}

export default AppLayout;
