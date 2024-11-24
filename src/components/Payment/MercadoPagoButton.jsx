import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Button } from '../ui/button';

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

const MercadoPagoButton = ({ plan }) => {
  const [preferenceId, setPreferenceId] = React.useState(null);

  const createPreference = async () => {
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan.name,
          price: parseFloat(plan.price.replace('R$ ', '').replace(',', '.')),
        }),
      });

      const { id } = await response.json();
      setPreferenceId(id);
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  return (
    <div>
      {!preferenceId ? (
        <Button
          variant="primary"
          className="w-full"
          onClick={createPreference}
        >
          Assinar Agora
        </Button>
      ) : (
        <Wallet initialization={{ preferenceId }} />
      )}
    </div>
  );
};

export default MercadoPagoButton;