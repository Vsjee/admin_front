import { useEffect, useState } from 'react';
import { getLocalStorage } from '../../utils/localstorage_util';
import { userIdKey } from '../../core/models/localstorage_model';
import adminService from '../../core/services/admin_service';
import { AdminUserProfile } from '../../core/types/admin_types';
import { ToastContainer, toast } from 'react-toastify';

function AdminProfile() {
  const [adminUser, setAdminUser] = useState<AdminUserProfile>(
    {} as AdminUserProfile
  );

  const getAdmin = () => {
    const userId = getLocalStorage(userIdKey);

    adminService
      .getAdminById(userId)
      .then((res) => {
        setAdminUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openPasswordModal = () => {
    (
      document.getElementById('admin_password') as HTMLDialogElement
    ).showModal();
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <>
      <PasswordEdtionModal user={adminUser} />

      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center gap-5">
            <h2 className="card-title">Administrador</h2>

            {/* info */}
            <ul>
              <li>ID: {adminUser._id}</li>
              <li>Nombre: {adminUser.user}</li>
              <li>
                Tipo cuenta: {adminUser.is_admin ? 'Administrador' : 'Usuario'}
              </li>
              <li>Estado: {adminUser.is_active ? 'Activa' : 'Desactivada'}</li>
            </ul>

            {/* bottom */}
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline  btn-primary"
                onClick={openPasswordModal}>
                Editar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface PasswordEdtionModalProps {
  user: AdminUserProfile;
}

const PasswordEdtionModal = ({ user }: PasswordEdtionModalProps) => {
  const [password, setPassword] = useState<string>('');
  const [passwordValidation, setPasswordValidation] = useState<string>('');

  const handlePasswordUpdate = () => {
    if (password === passwordValidation) {
      user.password = password;

      adminService
        .updateAdminPassword(user)
        .then((res) => {
          toast.success('Contraseña actualizada correctamente!', {
            position: 'top-right',
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });

          setTimeout(() => {
            window.location.reload();
          }, 1300);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setPassword('');
      setPasswordValidation('');

      toast.error('Error intenta nuevamente!', {
        position: 'top-right',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <dialog
        id="admin_password"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-5 flex flex-col justify-center items-center gap-5">
          <h3 className="font-bold text-lg">Actualizar Contraseña!</h3>
          {/* password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
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
              type="string"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </label>

          {/* password validation */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
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
              type="string"
              className="grow"
              value={passwordValidation}
              onChange={(e) => setPasswordValidation(e.target.value)}
              placeholder="Validar Contraseña"
            />
          </label>
          <div className="flex gap-5">
            <form>
              <button className="btn btn-outline btn-ghost">Cancelar</button>
            </form>
            <button
              className="btn btn-primary text-white"
              disabled={
                password.length !== 0 && passwordValidation.length !== 0
                  ? false
                  : true
              }
              onClick={handlePasswordUpdate}>
              Actualizar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AdminProfile;
