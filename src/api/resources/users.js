import { users } from '../index';
import useSWR from 'swr';

const useCurrentUser = (options = {}) => {
  const { data, error, isLoading } = useSWR(`/users/current`, async (_url) => {
    const response = await users.current();
    return response.data; // Should anything be done with respone.error here?
  }, {
    ...options
  });

  return { data, error, isLoading };
}

export {
  useCurrentUser,
};

