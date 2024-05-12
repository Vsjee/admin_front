import { ToastContainer, toast } from 'react-toastify';
import customersService from '../../../../core/services/customers_service';
import { Customer } from '../../../../core/types/customers_types';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  customer: Customer;
}

export const DeleteCustomerModal = ({ customer }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const deleteCustomer = () => {
    customersService
      .deleteCustomerById(customer._id)
      .then((res) => {
        toast.success(`Usuario ${customer._id} satisfactoriamente!`, {
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
          location.pathname !== '/dashboard/analytics_users'
            ? navigate('/dashboard/analytics_users')
            : window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast.error('Error intenta nuevamente', {
          position: 'top-right',
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });

        console.error(err);
      });
  };

  return (
    <>
      <ToastContainer />

      <dialog
        id="delete_customer_modal"
        className="modal modal-bottom sm:modal-middle text-center">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Eliminar usuario</h3>
          <div className="avatar">
            <div className="w-40 mask mask-heart">
              <img
                src="https://stg-srv.soybumii.com/images/kids/bumii/c_1.png"
                alt="Bumii"
              />
            </div>
          </div>
          <p className="py-4">
            Seguro que deseas eliminar a{' '}
            <span className="badge badge-outline badge-error">
              {customer._id}
            </span>
            , <br />
            esta accion es irreversible y perdera informacion realacionada a la
            cuenta.
          </p>
          <div className="flex gap-5 justify-center">
            <form method="dialog">
              <button className="btn btn-outline">Cancelar</button>
            </form>
            <button
              className="btn btn-error text-white"
              onClick={deleteCustomer}>
              Eliminar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
