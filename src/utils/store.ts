import { IProduct } from '../core/interfaces';

export const getCartTotalPrice = (cart: IProduct[]): string => {
  let total = 0;
  cart.map((item) => {
    total += item.price * item.quantity;
  });
  return total.toLocaleString('es-CO');
};
