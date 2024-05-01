import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CustomLink } from '../../ui';
import { menuRoutes, publicRoutes } from '../../models';
import logo from '../../assets/logo.svg';

import Drawer from '@mui/material/Drawer';
import Cart from '../Cart/Cart';
import { useCartStore } from '../../zustand';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    right: false,
  });

  const location = useLocation();

  const [cart] = useCartStore((state) => [state.cart]);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className='fixed w-full flex items-center justify-between flex-wrap py-2 lg:px-12 px-6 bg-opacity-5 backdrop-blur-lg rounded drop-shadow-lg ease-in duration-500 z-10'>
      <div className='animate__animated animate__fadeInLeft flex items-center flex-shrink-0 text-white mr-6 lg:mr-72'>
        <Link to={publicRoutes.HOME} className='flex items-center'>
          <img src={logo} className='mr-2' alt='Logo' width={35} height={35} />
          <h1>ORELLION</h1>
        </Link>
      </div>
      <div className='block lg:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='animate__animated animate__fadeInRight flex items-center px-3 py-2 rounded text-black-500 hover:text-green-4 ease-linear duration-300'
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? 'hidden' : 'block'}`}
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? 'block' : 'hidden'}`}
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
          </svg>
        </button>
      </div>
      <div className={`w-full lg:flex items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        <div className='animate__animated animate__fadeInRight text-sm flex gap-1 lg:gap-0 lg:flex-row flex-col lg:items-center'>
          {menuRoutes.map((item, i) => (
            <CustomLink route={item.route} text={item.text} color='green' type='menu' key={i} />
          ))}
          <button
            onClick={toggleDrawer('right', true)}
            className='relative w-fit py-1 px-3 lg:my-0 my-3 font-bold border rounded-full bg-green-4 text-black border-green-4 hover:text-green-4 hover:bg-transparent ease-in duration-300'
          >
            Carrito {cart.length >= 1 ? <span>{cart.length}</span> : <></>}
          </button>

          <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
            <Cart toggleDrawer={toggleDrawer('right', false)} />
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
