import { Link } from 'react-router-dom';
import { publicRoutes } from '../../core/models';

function Navbar() {
  return (
    <nav className="fixed w-full flex items-center justify-between flex-wrap py-2 lg:px-12 px-6 bg-opacity-5 backdrop-blur-lg rounded drop-shadow-lg ease-in duration-500 z-9">
      <div className="animate__animated animate__fadeInLeft flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
        <Link to={publicRoutes.LOGIN} className="flex items-center">
          <h1>Bumii Admin</h1>
        </Link>
      </div>
      <div className="block lg:hidden">
        <label
          htmlFor="my-drawer-2"
          className=" drawer-button lg:hidden cursor-pointer">
          <svg
            className={`fill-current h-3 w-3 block`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
      </div>
    </nav>
  );
}
export default Navbar;
