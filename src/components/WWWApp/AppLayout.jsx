import React from 'react'
import { Layout, Menu } from 'antd';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
import { auth, useCurrentUser } from '../../api';

const AppLayout = () => {
  const [current, setCurrent] = React.useState('about');
  const { currentUser } = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const key = location.pathname.split('/')[1]
    setCurrent(key || 'about');
  }, [location]);

  const handleLogout = () => {
    auth.logout();
    navigate('/'); // Redirect to home
  };

  let menuItems = [
    {
      key: 'about',
      label: <Link to="about">About Us</Link>,
    },
    {
      key: 'projects',
      label: <Link to="projects">Our Projects</Link>,
    },
    {
      key: 'contact',
      label: <Link to="contact">Contact Us</Link>,
    },
  ];

  if (currentUser) {
    if (currentUser.admin) {
      menuItems.push({
        key: 'admin',
        label: <Link to="admin">Admin</Link>,
      });
    }

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
        <Menu onClick={e => setCurrent(e.key)} theme="dark" mode="horizontal" selectedKeys={[current]} items={menuItems} />
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
