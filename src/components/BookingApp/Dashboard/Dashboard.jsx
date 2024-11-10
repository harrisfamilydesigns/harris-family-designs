import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth0/LogoutButton/LogoutButton";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // Temporary until figured out why authentication doesn't "stick"
  if (!isAuthenticated) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
