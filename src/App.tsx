import React from 'react';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import type { FormState } from '@/lib/types/form';

import SignUpForm from '@/components/forms/SignUpForm';
import CompanyInformationForm from '@/components/forms/CompanyInformationForm';
import ChooseAddressForm from '@/components/forms/ChooseAddressForm';
import ReviewAndPaymentForm from '@/components/forms/ReviewAndPaymentForm';
import { MultistepSidebar } from '@/components/navigation/MultistepSidebar';
import { MultistepNavigationButtons } from '@/components/navigation/MultistepNavigationButtons';

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

export default function App() {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const [formData, setFormData] = React.useState<Partial<FormState>>({
    signUp: undefined,
    companyInfo: undefined,
    address: undefined,
    payment: undefined,
  });

  const paginate = React.useCallback((newDirection: number) => {
    setPage((prev) => {
      const nextPage = prev[0] + newDirection;
      if (nextPage < 0 || nextPage > 3) return prev;
      return [nextPage, newDirection];
    });
  }, []);

  const onChangePage = React.useCallback((newPage: number) => {
    setPage((prev) => {
      if (newPage < 0 || newPage > 3) return prev;
      const currentPage = prev[0];
      return [newPage, newPage > currentPage ? 1 : -1];
    });
  }, []);

  const onBack = React.useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const onNext = React.useCallback(() => {
    paginate(1);
  }, [paginate]);

  const handleSignUpSubmit = React.useCallback((data: FormState['signUp']) => {
    setFormData((prev) => ({ ...prev, signUp: data }));
    onNext();
  }, [onNext]);

  const handleCompanyInfoSubmit = React.useCallback(
    (data: FormState['companyInfo']) => {
      setFormData((prev) => ({ ...prev, companyInfo: data }));
      onNext();
    },
    [onNext]
  );

  const handleAddressSubmit = React.useCallback(
    (data: FormState['address']) => {
      setFormData((prev) => ({ ...prev, address: data }));
      onNext();
    },
    [onNext]
  );

  const handlePaymentSubmit = React.useCallback(
    (data: FormState['payment']) => {
      setFormData((prev) => ({ ...prev, payment: data }));
      // Here you would typically handle the final form submission
      console.log('Final form data:', { ...formData, payment: data });
    },
    [formData]
  );

  const content = React.useMemo(() => {
    let component;

    switch (page) {
      case 0:
        component = <SignUpForm onSubmit={handleSignUpSubmit} />;
        break;
      case 1:
        component = <CompanyInformationForm onSubmit={handleCompanyInfoSubmit} />;
        break;
      case 2:
        component = <ChooseAddressForm onSubmit={handleAddressSubmit} />;
        break;
      case 3:
        component = formData.signUp && formData.companyInfo && formData.address ? (
          <ReviewAndPaymentForm
            formData={{
              signUp: formData.signUp,
              companyInfo: formData.companyInfo,
              address: formData.address,
            }}
            onSubmit={handlePaymentSubmit}
          />
        ) : null;
        break;
      default:
        component = null;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          key={page}
          animate="center"
          className="col-span-12"
          custom={direction}
          exit="exit"
          initial="enter"
          transition={{
            y: { ease: 'backOut', duration: 0.35 },
            opacity: { duration: 0.4 },
          }}
          variants={variants}
        >
          {component}
        </m.div>
      </LazyMotion>
    );
  }, [direction, page, formData, handleSignUpSubmit, handleCompanyInfoSubmit, handleAddressSubmit, handlePaymentSubmit]);

  return (
    <MultistepSidebar
      currentPage={page}
      onBack={onBack}
      onChangePage={onChangePage}
      onNext={onNext}
    >
      <div className="relative flex h-fit w-full flex-col pt-6 text-center lg:h-full lg:justify-center lg:pt-0">
        {content}
        <MultistepNavigationButtons
          backButtonProps={{ isDisabled: page === 0 }}
          className="hidden justify-start lg:flex"
          nextButtonProps={{
            children: page === 0 ? 'Sign Up for Free' : page === 3 ? 'Complete Payment' : 'Continue',
          }}
          onBack={onBack}
          onNext={onNext}
        />
      </div>
    </MultistepSidebar>
  );
}
