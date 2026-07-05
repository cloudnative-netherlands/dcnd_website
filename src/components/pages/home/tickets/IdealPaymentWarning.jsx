import { AlertTriangle } from 'lucide-react';
import React from 'react';

const SHOW_IDEAL_PAYMENT_WARNING = true;

const IdealPaymentWarning = () => {
  if (!SHOW_IDEAL_PAYMENT_WARNING) {
    return null;
  }

  return (
    <div className="tickets-payment-warning" role="status" aria-live="polite">
      <AlertTriangle className="tickets-payment-warning__icon" aria-hidden="true" />
      <div className="tickets-payment-warning__content">
        <p className="tickets-payment-warning__title">iDEAL payments are temporarily unavailable</p>
        <p className="tickets-payment-warning__body">
          Eventbrite is investigating a technical issue affecting iDEAL payments.
          <br />
          Please use another available payment method until the issue is resolved.
        </p>
      </div>
    </div>
  );
};

export default IdealPaymentWarning;
