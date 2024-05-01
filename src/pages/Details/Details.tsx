import React from 'react';
import { useParams } from 'react-router';
import question from '../../assets/icons/question.svg';
import Code from '../../assets/images/Code.png';
import Example1 from '../../assets/images/Example1.png';
import Example2 from '../../assets/images/Example2.png';
import bgefect from '../../assets/images/bgefect.png';
import { useEffect, useState } from 'react';
import { servicesData } from '../../data/servicesData';
import { IServiceData } from '../../interfaces/services.interfaces';
import Snackbar from '@mui/material/Snackbar';
import Alert from './Alert';

function Details() {
  const { id } = useParams();
  const [data, setData] = useState<IServiceData | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      const parseId = parseInt(id || '', 10);

      if (isNaN(parseId)) {
        return null;
      }

      const product = servicesData.find((value) => value.id === parseId);

      if (!product) {
        return null;
      }

      setData(product);
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div>Elemento no encontrado</div>;
  }

  const { title, prices } = data;

  /*snackbar mui element*/
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <section className='w-screen h-screen flex text-white items-center flex-row'>
      <img src={bgefect} alt='' className='fixed inset-0 object-cover -z-10' />
      <div className='w-1/2 h-full flex items-center justify-center'>
        <div className='w-3/4 h-5/6 flex flex-col justify-center items-center'>
          <h1 className='text-4xl'>{title}</h1>
          <hr className='w-1/6 border-gray-600 border-2 my-3 rounded' />
          <h1 className='text-3xl'>{prices[0].toLocaleString('es-CO')}</h1>
          <div className='flex w-4/5 h-1/4 flex-col justify-center'>
            <div className='flex justify-between h-1/3 items-center'>
              <h4 className='text-sm font-sans font-bold'>¿Como quieres tu web?</h4>
              <img src={question} className='h-1/3' />
            </div>
            <div className='w-full h-1/3 flex justify-between'>
              <button className='w-5/12 h-full bg-dark-gray font-sans text-xs rounded focus:ring-2 transition delay-150 duration-300 ease-in-out focus:ring-green-500 focus:font-bold'>
                NORMAL
              </button>
              <button className='w-5/12 h-full bg-dark-gray font-sans text-xs rounded focus:ring-2 transition delay-150 duration-300 ease-in-out focus:ring-green-500 focus:font-bold'>
                PERSONALIZADA
              </button>
            </div>
          </div>
          <div className='flex justify-around items-center w-4/5 h-1/4 relative'>
            <button className='w-1/4 transition delay-150 duration-300 ease-in-out opacity-60 focus:opacity-100 focus:scale-125'>
              <img src={Example1} alt='' className='w-full' />
            </button>
            <button className='w-1/4 transition delay-150 duration-300 ease-in-out opacity-60 focus:opacity-100 focus:scale-125'>
              <img src={Example2} alt='' className='w-full' />
            </button>
            <button className='w-1/4 transition delay-150 duration-300 ease-in-out opacity-60 focus:opacity-100 focus:scale-125'>
              <img src={Example1} alt='' className='w-full' />
            </button>
          </div>
          <form action='' className='w-4/5 h-1/4 flex flex-col items-center justify-around'>
            <button
              onClick={handleClick}
              className='w-full h-2/5 font-sans font-bold text-xs rounded border-solid border-2 border-green-500 transition duration-500 ease-in-out hover:text-green-400'
            >
              AGREGAR AL CARRITO
            </button>
            <button className='bg-green-500 w-full h-2/5 font-sans font-bold text-sm rounded'>
              COMPRAR AHORA
            </button>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} sx={{ width: '100%' }}>
              El producto se ha agregado correctamente
            </Alert>
          </Snackbar>
        </div>
      </div>
      <div className='w-1/2 h-full flex items-center relative overflow-hidden'>
        <img src={Code} alt='Code example' className='absolute left-64 -bottom-96' />
        <img src={Code} alt='Code example' className='absolute left-64 -top-96' />
        <img src={Code} alt='Code example' className='absolute' />
      </div>
    </section>
  );
}
export default Details;
