import { Typography } from 'antd';
import { useCurrentUser } from '../../api';
import CardLayout from '../shared/CardLayout';

const BudgetDashboardPage = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CardLayout title="Welcome">
      <Typography.Text>Hey {currentUser?.firstName || 'there'}!</Typography.Text>
      <Typography.Paragraph>This is a budget tracker app.</Typography.Paragraph>
    </CardLayout>
  )
};

export default BudgetDashboardPage;
