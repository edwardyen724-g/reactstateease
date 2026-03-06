import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export const getStripe = () => {
  if (!stripePromise) {
    throw new Error('Stripe.js has not been loaded properly.');
  }
  return stripePromise;
};