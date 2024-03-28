import { request } from "../request";

const current = async () => {
  return request.get(`/stripe_accounts/current`);
}

const createAccountLink = async ({ refreshUrl, returnUrl }) => {
  return request.post(`/stripe_accounts/account_link`, { stripeAccountLink: { refreshUrl, returnUrl } });
}

export const stripeAccounts = {
  current,
  createAccountLink
}
