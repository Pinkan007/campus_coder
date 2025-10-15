import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Access to basic tutorials',
      'Community forum',
      'Basic project showcase',
      'Limited cheatsheets',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    popular: true,
    features: [
      'All free features',
      'Advanced tutorials',
      'Priority support',
      'Full cheatsheet library',
      'Job board access',
      'Project collaboration tools',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    features: [
      'All premium features',
      'Admin dashboard access',
      'Custom branding',
      'Analytics dashboard',
      'Priority job listings',
      'Mentorship program',
      'Exclusive events',
    ],
  },
];

export const SubscriptionProvider = ({ children }) => {
  const { user, updateUser } = useAuth();

  const currentPlan =
    subscriptionPlans.find((plan) => plan.id === user?.subscription) ||
    subscriptionPlans[0];

  const subscribe = async (planId) => {
    if (!user) return false;

    const plan = subscriptionPlans.find((p) => p.id === planId);
    if (!plan) return false;

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const subscriptionExpiry = new Date();
    subscriptionExpiry.setMonth(subscriptionExpiry.getMonth() + 1);

    updateUser({
      subscription: planId,
      subscriptionExpiry: subscriptionExpiry.toISOString(),
    });

    return true;
  };

  const cancelSubscription = () => {
    if (!user) return;

    updateUser({
      subscription: 'free',
      subscriptionExpiry: undefined,
    });
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plans: subscriptionPlans,
        subscribe,
        cancelSubscription,
        currentPlan,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
