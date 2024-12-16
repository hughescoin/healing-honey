import { useCallback } from 'react';
import type { ChargeDetails } from 'src/types';

const useCreateCharge = () => {
  const createCharge = useCallback(async (chargeDetails: ChargeDetails) => {
    try {
      console.log('Client - Sending charge details:', chargeDetails);
      const res = await fetch('/api/createcharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chargeDetails),
      });

      console.log('Client - Response status:', res.status);
      const data = await res.json();
      console.log('Client - Response data:', data);
      console.log('Client - Response data.id :', data.data.id);
      return data.data.id;
    } catch (error) {
      console.error('Client - Error:', error);
      throw error;
    }
  }, []);

  return { createCharge };
};

export default useCreateCharge;
