import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
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

const PaymentForm = ({ paymentInfo: { user_id, price, plan_id, duration, total } }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
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

// const PaymentForm = ({ orderInfo: { user_id, total } }) => {
//   const [success, setSuccess] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (!error) {
//       try {
//         const { id } = paymentMethod;
//         const response = await axios.post(`../api/payment/save-payment`, {
//           total,
//           id,
//           user_id,
//         });

//         if (response.data.success) setSuccess(true);
//       } catch (err) {
//         console.log(`Error: ${err}`);
//       }
//     }
//   };

//   return (
//     <>
//       {!success ? (
//         <form
//           onSubmit={handleSubmit}
//           className="my-10 mx-auto max-w-lg rounded-xl bg-white"
//         >
//           {/* <fieldset className="FormGroup">
//             <div className="FormRow">
//               <CardElement options={CARD_OPTIONS} />
//             </div>
//           </fieldset> */}
//           <div className="p-4">
//             <CardElement options={CARD_OPTIONS} />
//             <span className="mx-auto mt-2">
//               Tổng cộng: {total ? total : 0}$
//             </span>
//           </div>

//           <button
//             type="submit"
//             disabled={!stripe}
//             className="block w-full bg-indigo-600 p-2 text-center text-white transition-all duration-200 hover:bg-indigo-700"
//           >
//             Thanh toán
//           </button>
//         </form>
//       ) : (
//         <div>payment success</div>
//       )}
//     </>
//   );
// };
