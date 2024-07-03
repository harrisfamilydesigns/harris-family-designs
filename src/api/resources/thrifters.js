import { thrifters } from '../controllers';
import useSWR from 'swr';

export const useThrifter = (id, options = {}) => {
  if (!id) {
    return { thrifter: null }
  }

  const { data, error, isLoading } = useSWR(`/thrifters/${id}`, async (_url) => {
    const response = await thrifters.get(id);
    return response.data; // Should anything be done with respone.error here?
  }, {
    ...options
  });

  return { thrifter: data, error, isLoading }
}
