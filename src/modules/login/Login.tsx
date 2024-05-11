import { useEffect, useState } from 'react';
import './login_styles.css';
import { useNavigate } from 'react-router-dom';
import adminService from '../../core/services/admin_service';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthStore } from '../../zustand/authStore';

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const [getAuth, updateAuthState] = useAuthStore((state) => [
    state.auth,
    state.updateAuth,
  ]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateLogin = async () => {
    console.log('userName:', userName);
    console.log('password:', password);

    adminService
      .getAdminAuth(userName, password)
      .then((response) => {
        if (response.data.authorized) {
          toast.success('Inicio sesion exitoso!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });

          updateAuthState(response.data.authorized);

          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          toast.error('Usuario y/o contraseña invalidos', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });

          updateAuthState(response.data.authorized);
        }
      })
      .catch((error) => {
        updateAuthState(false);
        console.error(error);
      });
  };

  useEffect(() => {
    if (getAuth) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="container">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            {/* user input */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Usuario"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>

            {/* password input */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                onClick={handleShowPassword}
                cursor={'pointer'}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                className="grow"
                placeholder="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* login btn */}
            <button
              className="btn btn-active btn-primary"
              onClick={validateLogin}>
              Ingresa
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
