import { KeyboardEvent, MouseEvent } from 'react';
import { useCartStore } from '../../zustand';
import { getCartTotalPrice } from '../../utils/store';
import CartItem from '../CartItem/CartItem';

interface Props {
  toggleDrawer: (event: KeyboardEvent | MouseEvent) => void;
}

function Cart({ toggleDrawer }: Props) {
  const [cart] = useCartStore((state) => [state.cart]);

  return (
    <section className='flex flex-col justify-between h-screen bg-gray-1 text-white p-5 sm:w-96 w-screen'>
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between'>
          <h1>
            Carrito <span>{cart.length}</span>
          </h1>
          <button
            onClick={toggleDrawer}
            className='text-green-3 hover:text-white ease-in duration-300'
            title='Cerrar'
          >
            X
          </button>
        </div>
        <ul className='h-96 mt-6 overflow-scroll overflow-x-hidden relative'>
          {cart.length === 0 ? (
            <li className='text-gray-3 font-bold absolute  w-full right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              Tu Carrito esta vacio, Agrega algún producto.
            </li>
          ) : (
            cart.map((item, i) => <CartItem product={item} keyList={i + 1} key={i} />)
          )}
        </ul>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='flex justify-between'>
          Total: <span>$ {getCartTotalPrice(cart)}</span>
        </h1>
        {cart.length >= 1 ? (
          <button className='bpy-1 w-full border text-black border-green-3 bg-green-3 hover:border-green-4 hover:bg-bg-accent hover:text-green-4 rounded-full ease-in duration-300'>
            Factura tu compra
          </button>
        ) : (
          <button
            className='bpy-1 w-full border disabled:opacity-60 cursor-not-allowed text-black border-green-3 bg-green-3 rounded-full'
            disabled
            title='Añade un producto primero'
          >
            Factura tu compra
          </button>
        )}
      </div>
    </section>
  );
}
export default Cart;
