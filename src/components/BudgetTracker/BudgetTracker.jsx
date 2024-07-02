import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../api';
import LoginPage from '../shared/LoginPage';

export const BudgetTracker = () => {
  const { currentUser, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // TODO: use router and more advanced login and dashboard routing
    // Pull more Auth logic out of SecondHandApp into shared components
    // Currently doesn't reload current user, etc.
    return <LoginPage onSuccess={() => navigate('/projects/budget_tracker')}/>;
  }

  return (
    <div>
      <h1>Welcome {currentUser.email}</h1>
      <p>This is a budget tracker app</p>
    </div>
  )
};
