import { IProduct } from '../../interfaces';
import deleteIcon from '../../assets/icons/delete.svg';
import './cartItem.css';
import { useCartStore } from '../../zustand';

interface Props {
  product: IProduct;
  keyList: number;
}

function CartItem({ product, keyList }: Props) {
  const remove = useCartStore((state) => state.removeFromCart);

  return (
    <li className='flex gap-1 border-b-2 border-gray-2 p-2 rounded h-28'>
      <span>{keyList}</span>
      <div className='w-full'>
        <ul className='px-2 list-none'>
          <li className='font-bold'>Producto: {product.type}</li>
          <li className='text-xs'>Precio por unidad: ${product.price.toLocaleString('es-CO')}</li>
          <li className='text-xs'>Tipo: {product.category}</li>
          <li className='text-xs'>Cantidad: {product.quantity}</li>
        </ul>
      </div>
      <button
        className='h-fit self-center rounded-full p-1 hover:bg-red-500 ease-in duration-300'
        title='Eliminar'
        onClick={() => remove(product)}
      >
        <img src={deleteIcon} alt='delete' width={30} height={30} className='icon' />
      </button>
    </li>
  );
}
export default CartItem;
