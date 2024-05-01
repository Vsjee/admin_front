import logo from '../../assets/logo.svg';

function Footer() {
  return (
    <footer className='font-sans flex items-center justify-center sm:mt-44 mt-20 md:text-start text-center'>
      <div>
        <div className='w-5/6 mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-7 sm:gap-2 gap-0'>
          <div className='md:p-4 p-1 md:border-0 border-b border-gray-2'>
            <div className='flex items-center md:justify-start justify-center'>
              <img src={logo} className='mr-2' alt='Logo' width={35} height={35} title='Orellion' />
              <h1 className='text-xl'>ORELLION</h1>
            </div>
            <p className='text-xs my-2 text-gray-4'>
              Clarity gives you the blocks and components you need to create a truly professional
              website.
            </p>
          </div>
          <div className='md:p-4 pb-5 md:border-0 border-b border-gray-2'>
            <h3 className='text-gray-4 text-xs font-sans font-bold my-3'>NOSOTROS</h3>
            <ul className='grid gap-5 list-none'>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300'>
                Conocenos
              </li>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300'>
                Características
              </li>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300'>
                Proyectos
              </li>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300'>
                Institución
              </li>
            </ul>
          </div>
          <div className='md:p-4 pb-5 md:border-0 border-b border-gray-2'>
            <h3 className='text-gray-4 text-xs font-sans font-bold my-3'>AYUDA</h3>
            <ul className='grid gap-5 list-none'>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300'>
                Atención al Cliente
              </li>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300'>
                Detalles de Desarrollo
              </li>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300 text-green-2'>
                Términos y Condiciones
              </li>
              <li className='text-xs font-medium mx-0 cursor-pointer hover:text-green-4 ease-in duration-300'>
                Políticas de Privacidad
              </li>
            </ul>
          </div>
          <div className='md:p-4 pb-5'>
            <h3 className='text-gray-4 text-xs font-sans font-bold sm:mt-3 mt-5'>NEWSLETTER</h3>
            <form action=''>
              <input
                className='h-11 rounded-lg border-gray-3 border-2 p-2 text-xs w-full mt-6'
                type='email'
                placeholder='Ingresa tu correo electrónico'
              />
              <button className='h-11 rounded-lg p-2 text-xs w-full mt-3 bg-green-2 font-bold hover:bg-green-4 hover:text-black ease-in duration-300'>
                Suscribirme ahora
              </button>
            </form>
          </div>
        </div>
        <hr className='w-5/6 mx-auto border-1 border-gray-2' />
        <h6 className='text-xs text-gray-5 text-center m-7'>
          © Copyright 2023, Todos los derechos reservados por Orellion
        </h6>
      </div>
    </footer>
  );
}
export default Footer;
