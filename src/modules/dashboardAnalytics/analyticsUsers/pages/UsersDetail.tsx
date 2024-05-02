import { useCustomerStore } from '../../../../zustand/customerStore';
import { useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { date_parser_util } from '../../../../utils/date_parser_util';

import bumii_reading from '../../../../assets/images/home/bumii_reading.jpg';
import bumii_with_kid from '../../../../assets/images/home/bumii_with_kid.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import UserDetailHeader from '../components/UserDetailHeader';

function UsersDetail() {
  const history = useNavigate();
  const location = useLocation();

  const customer = useCustomerStore((state) => state.customer);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('ID copiado al portapapeles', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      toastId: 'copyToast',
    });
  }, []);

  const navigateToUserDataInfo = (path: string) => {
    const newPath = location.pathname + '/' + path;
    history(newPath);
  };

  return (
    <>
      <ToastContainer />

      <UserDetailHeader customer={customer} />

      <div
        className="p-5"
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 85px)' }}>
        {/* user info */}
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <div className="avatar">
            <div className="w-60 mask mask-hexagon">
              <img
                src="https://stg-srv.soybumii.com/images/kids/bumii/c_1.png"
                alt="Bumii"
              />
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">
              datos del usuario
              <div
                className="cursor-pointer"
                onClick={() => copyToClipboard(customer._id)}>
                {customer._id != '' && customer._id != null ? (
                  <div className="badge  badge-primary badge-outline badge-sm">
                    {customer._id}
                  </div>
                ) : (
                  <div className="badge badge-ghost badge-sm">
                    No registra id
                  </div>
                )}
              </div>
            </h2>

            {/* user name */}
            <div>
              Nombre:{' '}
              {customer.fistName != '' && customer.fistName != null ? (
                <span>{customer.fistName}</span>
              ) : (
                <span className="badge badge-ghost badge-sm">
                  No registra nombre
                </span>
              )}
            </div>

            {/* user email */}
            <div>
              Correo:{' '}
              {customer.email != '' && customer.email != null ? (
                <span>{customer.email}</span>
              ) : (
                <span className="badge badge-ghost badge-sm">
                  No registra correo
                </span>
              )}
            </div>

            {/* user cellphone */}
            <div>
              Telefono:{' '}
              {customer.cellphone != '' && customer.cellphone != null ? (
                <span className="font-bold">{customer.cellphone}</span>
              ) : (
                <span className="badge badge-ghost badge-sm">
                  No registra telefono
                </span>
              )}
            </div>

            {/* user creation date */}
            <div>
              Fecha de creacion:{' '}
              {customer.creationDate != null ? (
                'No tiene fecha valida' !==
                date_parser_util(customer.creationDate) ? (
                  date_parser_util(customer.creationDate)
                ) : (
                  <span className="badge badge-ghost badge-sm">
                    No tiene fecha valida
                  </span>
                )
              ) : (
                <span className="badge  badge-ghost badge-sm">
                  No tiene fecha valida
                </span>
              )}
            </div>

            {/* user is active  */}
            <div className="">
              <button
                className={
                  customer.isActive
                    ? 'btn btn-outline btn-xs btn-success '
                    : 'btn btn-outline btn-xs btn-error'
                }>
                {customer.isActive ? 'Cuenta activa' : 'Cuenta inactiva'}
              </button>
            </div>

            {/* user delete */}
            <div className="card-actions justify-end">
              <button className="btn btn-outline btn-xs btn-error">
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <div className="flex pt-10 justify-center">
          {/* user kids count */}
          <div className="card w-full  h-64  bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src={bumii_reading}
                alt="Bumii kids"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Libros creados por el usuario</h2>
              <p>Visualizacion, edicion y eliminacion de registros</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToUserDataInfo('books')}>
                  Mas informacion
                </button>
              </div>
            </div>
          </div>

          <span className="p-5"></span>

          {/* user books count */}
          <div className="card w-full  h-64 bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src={bumii_with_kid}
                alt="Bumii kids"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Niños creados por el usuario</h2>
              <p>Visualizacion, edicion y eliminacion de registros</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToUserDataInfo('kids')}>
                  Mas informacion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersDetail;
