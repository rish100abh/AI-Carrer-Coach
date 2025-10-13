
import React from 'react'
import OnboardingForm from '../onboarding/_components/onboarding-form';
import { industries } from '@/data/industries';
import { redirect } from 'next/navigation';
import { getUserOnboardingStatus } from '@/actions/user';

const OnboardingPage = async () => {
 const { isOnboarded } = await getUserOnboardingStatus();

  if(isOnboarded) {
    redirect("/dashboard");
  }


  return (
    <div>
      <OnboardingForm industries={industries} />
    </div>
  )
}

export default OnboardingPage;


