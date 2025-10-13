import { getUserOnboardingStatus } from '@/actions/user';
import { industries } from '@/data/industries';
import { redirect } from 'next/navigation';
import React from 'react';
import OnboardingForm from '../onboarding/_components/onboarding-form';

const IndustryInsightsPage = async () => {
  // check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div>
      <OnboardingForm industries={industries} /> 
      
    </div>
  );
};

export default IndustryInsightsPage;
