import { Button } from "antd";
import { useState } from "react";
import LoginForm from 'components/BookingApp/LoginForm/LoginForm';
import SignupForm from 'components/BookingApp/SignupForm/SignupForm';

const LOGIN_FORM = 'login';
const SIGNUP_FORM = 'signup';

export default function Main() {
  const [visibleForm, setVisibleForm] = useState(null);

  return (
    <div className="h-dvh bg-gray-50 overflow-auto flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col justify-center items-center">

        <div className="bg-white p-10 m-5 drop-shadow-xl rounded-xl">
          <h1 className="text-4xl font-bold mb-4">BookSuite</h1>
          <p className="text-lg text-gray-500">
            Create, track, and manage bookings, appointments, and reservations with ease.
          </p>
          {!visibleForm && (
            <div>
              <Button type="primary" className="mt-5" onClick={() => setVisibleForm(SIGNUP_FORM)}>Sign Up</Button>
              <div>
                Already have an account?
                <Button type="link" className="m-0" onClick={() => setVisibleForm(LOGIN_FORM)}>Login</Button>
              </div>
            </div>
          )}
          { visibleForm && (
            <div className="mt-10 max-w-lg">
              { visibleForm === LOGIN_FORM && <LoginForm onSwitch={() => setVisibleForm(SIGNUP_FORM)}/> }
              { visibleForm === SIGNUP_FORM && <SignupForm onSwitch={() => setVisibleForm(LOGIN_FORM)}/> }
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}

