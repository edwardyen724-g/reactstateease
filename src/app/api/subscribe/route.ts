import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe'; // Assuming you have a stripe instance configured in lib/stripe
import { supabase } from '@/lib/supabase'; // Assuming you have a supabase instance configured in lib/supabase'

interface AuthedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
  };
}

const subscriptionsMap = new Map<string, number>();

export async function POST(req: AuthedRequest, res: NextApiResponse) {
  const { user } = req; // User should be validated before this point
  const { priceId } = await req.json();

  // Rate limiting
  const requestKey = user?.id || 'guest';
  const currentRequests = subscriptionsMap.get(requestKey) || 0;

  if (currentRequests >= 5) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  subscriptionsMap.set(requestKey, currentRequests + 1);

  try {
    if (!user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    if (!supabaseUser) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const customer = await stripe.customers.create({
      email: supabaseUser.email,
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    return res.status(200).json(subscription);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  } finally {
    // Cleanup rate limiting
    if (subscriptionsMap.has(requestKey)) {
      subscriptionsMap.set(requestKey, subscriptionsMap.get(requestKey)! - 1);
    }
  }
}