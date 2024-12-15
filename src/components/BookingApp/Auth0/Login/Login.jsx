import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button type="primary" onClick={() => loginWithRedirect()}>Login</Button>
      <span className="ml-3">or</span>
      <Button type="link" onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Sign Up</Button>
    </>

  );
}

export default LoginButton;
