import { users } from '../index';
import useSWR from 'swr';

const useCurrentUser = () => {
  const { data, error, isLoading } = useSWR(`/users/current`, async (_url) => {
    const { data } = await users.current();
    return data;
  });

  return { data, error, isLoading };
}

export {
  useCurrentUser,
};

