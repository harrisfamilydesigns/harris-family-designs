import { get, post } from "../request";

const currentStripeAccount = async () => {
  return get(`/stripe_accounts/current`);
}

const createAccountLink = async ({ refreshUrl, returnUrl }) => {
  return post(`/stripe_accounts/account_link`, { stripeAccountLink: { refreshUrl, returnUrl } });
}

export const stripeAccounts = {
  currentStripeAccount,
  createAccountLink
}
