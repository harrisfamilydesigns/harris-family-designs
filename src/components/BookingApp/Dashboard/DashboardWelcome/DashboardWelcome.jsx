import { useAuth0 } from '@auth0/auth0-react';

const DashboardWelcome = () => {
  const { user } = useAuth0();

  return (
    <div className="bg-white p-10 m-5 drop-shadow-xl rounded-xl">
      <h1 className="text-4xl font-bold mb-4">BookSuite</h1>
      <p className="text-lg text-gray-500">
        Create, track, and manage bookings, appointments, and reservations with ease.
      </p>
      <p className="mt-5 text-lg text-gray-500">
        Welcome, {user.name}!
      </p>
    </div>
  );
};

export default DashboardWelcome;
