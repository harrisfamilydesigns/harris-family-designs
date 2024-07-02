import { useCurrentUser } from '../../api';
import LoginPage from '../SecondHandApp/LoginPage';

export const BudgetTracker = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div>
      <h1>Welcome {currentUser.email}</h1>
      <p>This is a budget tracker app</p>
    </div>
  )
};
