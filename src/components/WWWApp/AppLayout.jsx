import React from 'react'
import { Layout, Menu } from 'antd';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, useCurrentUser } from 'api';
import LogoIcon from 'components/shared/LogoIcon';

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
      key: 'projects',
      label: <Link to="/projects">Projects</Link>,
    },
    {
      key: 'about',
      label: <Link to="/about">About Us</Link>,
    },
    // {
    //   key: 'contact',
    //   label: <Link to="contact">Contact Us</Link>,
    // },
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
    <Layout className="min-h-dvh">
      <Layout.Header className="sticky top-0 z-10 p-0">
        <div className="flex items-center">
          <LogoIcon className="bg-white pl-3" />
          <Menu
            className="grow"
            onClick={e => setCurrent(e.key)}
            mode="horizontal"
            selectedKeys={[current]}
            items={[
              ...menuItems
            ]}
          />
        </div>
      </Layout.Header>
      <Outlet />
    </Layout>
  )
}

export default AppLayout;
