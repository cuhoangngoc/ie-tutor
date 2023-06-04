import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const StripeContainer = ({ paymentInfo }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm paymentInfo={paymentInfo} />
    </Elements>
  );
};

export default StripeContainer;
