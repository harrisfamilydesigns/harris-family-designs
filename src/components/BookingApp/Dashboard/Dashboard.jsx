import { useAuth0 } from "@auth0/auth0-react";
import { Layout, Menu } from 'antd';
import { LogoutOutlined } from "@ant-design/icons";
import { Navigate, Outlet } from "react-router-dom";

const {
  Sider,
  Content,
} = Layout;

const Dashboard = () => {
  const {
    logout,
    isAuthenticated,
    isLoading
  } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/booksuite" />;
  }

  return (
    <Layout hasSider>
      <Sider theme="light" className="h-dvh fixed overflow-auto left-0 top-0 bottom-0 inset-0">
        <div className="flex flex-col h-full">
          <div className="flex-none text-xl p-4">BookSuite</div>
          <div className="flex-auto">
            <Menu
              mode="vertical"
              items={[
                {
                  key: 'dashboard',
                  label: 'Dashboard',
                },
              ]}
            />
          </div>
          <Menu
            className="flex-none mt-4"
            mode="vertical"
            items={[
              {
                key: 'logout',
                onClick: () => logout({ logoutParams: { returnTo: `${window.location.origin}/booksuite` } }),
                label: 'Log Out',
                icon: <LogoutOutlined />,
              },
            ]}
          />
        </div>
      </Sider>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Dashboard;
