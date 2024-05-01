import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { IProduct } from '../interfaces';

interface State {
  cart: IProduct[];
}

interface Actions {
  addToCart: (Item: IProduct) => void;
  removeFromCart: (Item: IProduct) => void;
}

const INITIAL_STATE: State = {
  cart: [],
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,

      addToCart: (product: IProduct) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: (item.quantity as number) + 1 } : item
          );
          set(() => ({
            cart: updatedCart,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set(() => ({
            cart: updatedCart,
          }));
        }
      },

      removeFromCart: (product: IProduct) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
        }));
      },
    }),
    {
      name: 'cart-storagee',
    }
  )
);
