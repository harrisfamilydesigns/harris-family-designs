import { useCurrentUser } from '../../api';

const BudgetDashboardPage = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome {currentUser.email}</h1>
      <p>This is a budget tracker app</p>
    </div>
  )
};

export default BudgetDashboardPage;
