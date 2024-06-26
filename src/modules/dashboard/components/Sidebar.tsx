import { NavLink, useNavigate } from 'react-router-dom';
import { menuRoutes } from '../../../core/models';
import { useAuthStore } from '../../../zustand/authStore';
import { ToastContainer, toast } from 'react-toastify';
import { userIdKey } from '../../../core/models/localstorage_model';
import { removeLocalStorage } from '../../../utils/localstorage_util';

function Sidebar() {
  const history = useNavigate();

  const updateAuthState = useAuthStore((state) => state.updateAuth);

  const handleLogout = () => {
    updateAuthState(false);
    removeLocalStorage(userIdKey);

    toast.success('Sesion cerrada exitosamente!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    setTimeout(() => {
      history('/');
    }, 1000);
  };

  return (
    <>
      <ToastContainer />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <div className="p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
          <div>
            {/* close drawer btn */}
            <div className={'flex justify-end lg:hidden'}>
              <label htmlFor="my-drawer-2" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            </div>

            {/* menu list items */}
            <ul className="menu">
              {menuRoutes.map((route, i) => {
                return (
                  <li key={i}>
                    <NavLink to={route.route} className="btn btn-ghost">
                      <label htmlFor="my-drawer-2" className="cursor-pointer">
                        {route.text}
                      </label>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* logout btn */}
          <div className="menu place-content-center">
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-primary cursor-pointer">
                Logout
              </button>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
