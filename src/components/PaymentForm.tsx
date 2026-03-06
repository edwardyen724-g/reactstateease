import React from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface PaymentFormValues {
  name: string;
  email: string;
}

const PaymentForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormValues>();
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      if (!stripe || !elements) {
        throw new Error("Stripe has not loaded yet.");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card Element not found.");
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: data.name,
          email: data.email,
        },
      });

      if (error) {
        console.error(error);
        alert(`Payment failed: ${error.message}`);
        return;
      }

      // Handle payment success (e.g., send paymentMethod.id to the server)
      console.log('Payment successful!', paymentMethod);
      alert('Payment successful!');

    } catch (err) {
      console.error(err);
      alert(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
          id="name"
          className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          id="email"
          className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">Credit or Debit Card</label>
        <CardElement id="card-element" className="border p-3 mt-1 rounded-md" />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;