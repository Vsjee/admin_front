import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { Customer } from '../core/types/customers_types';

interface State {
  customer: Customer;
}

interface Actions {
  updateCustomer: (customer: Customer) => void;
}

const INITIAL_STATE: State = {
  customer: {} as Customer,
};

export const useCustomerStore = create(
  persist<State & Actions>(
    (set) => ({
      customer: INITIAL_STATE.customer,

      updateCustomer: (product: Customer) => {
        set(() => ({
          customer: product,
        }));
      },
    }),
    {
      name: 'customer_data',
    }
  )
);
