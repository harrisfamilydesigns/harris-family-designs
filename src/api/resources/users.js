import { users } from '../controllers';
import useSWR from 'swr';

export const useCurrentUser = (options = {}) => {
  const { data, error, isLoading } = useSWR(`/users/current`, async (_url) => {
    const response = await users.current();
    return response.data; // Should anything be done with respone.error here?
  }, {
    ...options
  });

  return { currentUser: data, error, isLoading }
}
