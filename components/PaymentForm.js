import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from './Toast';
import { useRouter } from 'next/router';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      // iconColor: '#c4f0ff',
      // color: '#000',
      fontWeight: 800,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#9BA4B5',
      },
    },
    invalid: {
      iconColor: '#D21312',
      color: '#D21312',
    },
  },
};

const PaymentForm = ({ paymentInfo: { user_id, price, plan_id, duration, total, type } }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) {
      router.push('/api/auth/login');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (total <= 0) {
      showErrorToast('Please select a plan');
      return;
    }

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/subscriptions`,
          {
            userId: user_id,
            planId: plan_id,
            duration: duration,
            total: total,
            paymentMethodId: id,
            type: type,
          }
        );

        if (!response.status === 200) {
          showErrorToast(response.data.message);
          return;
        }

        showSuccessToast('Payment success! You will be redirected to home page after 5 seconds');
        setTimeout(() => {
          router.push('/');
        }, 5000);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto my-10 max-w-lg rounded-xl bg-white">
        {/* <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset> */}
        <div className="p-4">
          <CardElement options={CARD_OPTIONS} />
          {total > 0 ? (
            <p className="mt-4 text-end font-semibold">
              Total: {duration} month(s) x ${price} ={' '}
              <span className="text-green-500">${total}</span>
            </p>
          ) : (
            <p className="mt-4 text-end font-semibold">
              <span className="text-error">Select a plan</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="block w-full bg-indigo-600 p-2 text-center text-white transition-all duration-200 hover:bg-indigo-700"
        >
          Pay
        </button>
      </form>
    </>
  );
};

export default PaymentForm;
