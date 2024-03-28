import { stripeAccounts } from '../controllers/stripeAccounts';
import useSWR from 'swr';

export const useCurrentStripeAccount = (options = {}) => {
  const { data, error, isLoading } = useSWR(`/stripeAccounts/current`, async (_url) => {
    const response = await stripeAccounts.current();
    return response.data; // Should anything be done with respone.error here?
  }, {
    ...options
  });

  return { currentStripeAccount: data, error, isLoading }
};
