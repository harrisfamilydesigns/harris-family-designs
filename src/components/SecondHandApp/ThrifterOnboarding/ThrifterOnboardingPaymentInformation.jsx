import React from 'react';
import { Alert, Button, Form, App, Spin } from 'antd';
import CardLayout from '../../shared/CardLayout';
import Typography from 'antd/es/typography/Typography';
import { stripeAccounts } from '../../../api';
import { useSearchParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useCurrentStripeAccount } from '../../../api';

const isAccountEnabled = (account) => {
  return account.capabilities.transfers === 'active' &&
    account.payoutsEnabled &&
    account.detailsSubmitted
}

const ThrifterOnboardingPaymentInformation = ({onNext, onPrev}) => {
  const [error, setError] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [searchParams] = useSearchParams();
  const { message } = App.useApp();
  const { currentStripeAccount, isLoading } = useCurrentStripeAccount();

  // For handling returnUrl and refreshUrl back to this page
  // Auto redirect contingent upon searchParams
  React.useEffect(() => {
    if (!searchParams) return;

    (async () => {
      if (searchParams.get('via') === 'refreshUrl') {
        sendToStripe();
      }

      // The user can return, but still not have allowed tranfers to their connected account
      // If they have, we can move on
      // If they haven't we need to show an error and prevent them from moving on
      if (searchParams.get('via') === 'returnUrl') {
        const { data, error } = await stripeAccounts.current();

        if (error) {
          setError(error.message);
          return;
        }

        if (data && isAccountEnabled(data)) {
          message.success('Payment information saved!');
          onNext();
        } else {
          setError('You must allow transfers to your connected account to continue.');
        }
      }
    })()
  }, [searchParams]);

  const sendToStripe = async () => {
    const { data, error } = await stripeAccounts.createAccountLink({
      refreshUrl: `${window.location.href}?via=refreshUrl`,
      returnUrl: `${window.location.href}?via=returnUrl`
    })

    if (error) {
      setError(error.message);
      return;
    }

    window.location.href = data.url;
  }


  const handleSubmit = async () => {
    setSubmitting(true);
    await sendToStripe();
  }

  return (
    <CardLayout title="Getting Paid for Your Finds">
      <Typography.Paragraph>
        Securely add your payment information.
        This ensures you're compensated for your thrifting prowess.
      </Typography.Paragraph>

      <Typography.Paragraph>
        We use Stripe to securely process payments. Your information is never stored on our servers.
        The link below will take you to Stripe's secure payment form. From there, you can select how you'd like to be paid.
      </Typography.Paragraph>

      <Form onFinish={handleSubmit}>
        <Button type={ currentStripeAccount ? 'link' : 'primary' } htmlType="submit" disabled={submitting} style={{ padding: currentStripeAccount ? 0 : 'inherit' }}>
          { submitting ? (
            <>
              <LoadingOutlined/>
              <span style={{marginLeft: 5}}>Redirecting to Stripe...</span>
            </>
          ) : currentStripeAccount ? 'Update Stripe connection' : 'Connect your Stripe account' }
        </Button>
      </Form>
      {
        currentStripeAccount && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={onPrev} style={{marginTop: 10}}>Back</Button>
            <Button type="primary" onClick={onNext} style={{marginTop: 10}}>Next</Button>
          </div>
        )
      }
      {error && <Alert message={error} type="error" />}
    </CardLayout>
  );
}

export default ThrifterOnboardingPaymentInformation;
