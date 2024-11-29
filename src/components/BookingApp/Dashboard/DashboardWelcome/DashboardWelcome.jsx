import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import { request } from 'api/request';
import useGetAccessTokenDynamically from 'hooks/auth0/useGetAccessTokenDynamically';

const DashboardWelcome = () => {
  const { user } = useAuth0();
  const getAccessTokenDynamically = useGetAccessTokenDynamically();

  const getTest = async () => {
    try {
      const token = await getAccessTokenDynamically({
        authorizationParams: {
          audience: 'https://harrisfamilydesigns',
        },
      });

      const response = await request.get(`/booksuite/tests/test`, true, token);
      console.log('data: ', response.data); // Should anything be done with respone.error here?
    } catch (error) {
      console.error('error: ', error);
    }
  }

  return (
    <div className="container mx-auto flex-1 flex flex-col justify-center items-center">
      <div className="bg-white p-10 m-5 drop-shadow-xl rounded-xl">
        <h1 className="text-4xl font-bold mb-4">BookSuite</h1>
        <p className="text-lg text-gray-500">
          Create, track, and manage bookings, appointments, and reservations with ease.
        </p>
        <p className="mt-5 text-lg text-gray-500">
          Welcome, {user.name}!
        </p>
        <Button className="mt-3" onClick={getTest}>Get Test</Button>
      </div>

    </div>
  );
};

export default DashboardWelcome;
