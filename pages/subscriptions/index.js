import Layout from '../../components/Layout/Layout';
import SubscriptionCard from '../../components/SubScriptions/SubscriptionCard';
import { useState } from 'react';
import StripeContainer from '../../components/StripeContainer';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';
import Spinner from '../../components/Spinner';

const Subscriptions = ({ plans }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({ total: 0 });
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (error) return <div>{error.message}</div>;

  const selectPlan = (plan) => {
    setSelectedPlan(plan);

    const payment = {
      user_id: user?.sub.split('|')[1],
      plan_id: plan.id,
      type: plan.type,
      duration: plan.duration,
      price: plan.price,
      total: plan.price * plan.duration,
    };
    setPaymentInfo(payment);

    document.getElementById('headline').classList.remove('opacity-0');
  };

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#ccc]">
        {/* <!-- main card --> */}
        <div className="rounded-xl bg-[#F4F5FA] p-10">
          {/* <!-- headers content--> */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-lg font-sans font-bold">Start advancing your English today</div>
            <div className="mt-5 max-w-lg text-sm font-light">
              Get connected with the best English tutor in the world.
            </div>
          </div>

          {/* <!-- plans --> */}
          <div className="mt-10 flex flex-col items-center justify-center space-x-0  space-y-12 md:flex-row md:space-x-8 md:space-y-0">
            {plans.map((plan, i) => (
              <SubscriptionCard
                key={i}
                plan={plan}
                onClick={() => {
                  selectPlan(plan);
                }}
                htmlFor={`plan-${i}`}
              />
            ))}
          </div>

          <div
            id="headline"
            className="mt-20 text-center text-xl font-light opacity-0 transition-all duration-200"
          >
            <div>
              You have selected <span className="font-bold">{selectedPlan?.type}</span> subscription
              for <span className="font-bold">{selectedPlan?.price}$</span> per month.
            </div>
          </div>

          <StripeContainer paymentInfo={paymentInfo} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const plansPromise = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/plans`);

  return {
    props: {
      plans: plansPromise.data,
    },
  };
}

export default Subscriptions;
