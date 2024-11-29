import { useAuth0 } from "@auth0/auth0-react";

export default function useGetAccessTokenDynamically() {
  const {
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  const getAccessTokenDynamically = (options) => {
    return getAccessTokenSilently(options)
      .catch(error => {
        console.error('getAccessTokenSilently error: ', error);
        return getAccessTokenWithPopup(options);
      });
  }

  return getAccessTokenDynamically;
}
