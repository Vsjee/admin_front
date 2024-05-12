import { useCallback, useState } from 'react';
import { Customer } from '../../../../core/types/customers_types';
import { date_parser_util } from '../../../../utils/date_parser_util';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCustomerStore } from '../../../../zustand/customerStore';
import { DeleteCustomerModal } from './DeleteCustomerModal';

interface Props {
  customers: Customer[];
}

function UsersTable({ customers }: Props) {
  const updateCustomerState = useCustomerStore((state) => state.updateCustomer);
  const history = useNavigate();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    {} as Customer
  );

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

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

  const customerDetailsNav = (customer: Customer) => {
    updateCustomerState(customer);
    history(`/dashboard/analytics_users/${customer._id}`);
  };

  const openCustomerDeletionModal = () => {
    (
      document.getElementById('delete_customer_modal') as HTMLDialogElement
    ).showModal();
  };

  return (
    <>
      <ToastContainer />

      <DeleteCustomerModal customer={selectedCustomer} />

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Fecha creacion</th>
              <th>Fecha actualizacion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr>
                <td>
                  <div>
                    <div
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(customer._id)}>
                      {customer._id != '' && customer._id != null ? (
                        <div className="badge  badge-primary badge-outline badge-sm">
                          {customer._id}
                        </div>
                      ) : (
                        <div className="badge badge-ghost badge-sm">
                          No registra nombre
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">
                      {customer.fistName != '' && customer.fistName != null ? (
                        <div className="font-bold">{customer.fistName}</div>
                      ) : (
                        <div className="badge badge-ghost badge-sm">
                          No registra nombre
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">
                    {customer.email != '' && customer.email != null ? (
                      <div className="font-bold">{customer.email}</div>
                    ) : (
                      <div className="badge badge-ghost badge-sm">
                        No registra correo
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {customer.cellphone != '' && customer.cellphone != null ? (
                    <div className="font-bold">{customer.cellphone}</div>
                  ) : (
                    <div className="badge badge-ghost badge-sm">
                      No registra telefono
                    </div>
                  )}
                </td>
                <td>
                  <div className="font-bold">
                    {customer.creationDate != null ? (
                      'No tiene fecha valida' !==
                      date_parser_util(customer.creationDate) ? (
                        date_parser_util(customer.creationDate)
                      ) : (
                        <div className="badge badge-ghost badge-sm">
                          No tiene fecha valida
                        </div>
                      )
                    ) : (
                      <div className="badge  badge-ghost badge-sm">
                        No tiene fecha valida
                      </div>
                    )}
                  </div>
                </td>
                <th>
                  <button
                    className="btn btn-outline btn-primary btn-xs"
                    onClick={() => customerDetailsNav(customer)}>
                    detalle
                  </button>
                </th>
                <th>
                  <button
                    className="btn btn-square btn-outline btn-xs btn-error"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      openCustomerDeletionModal();
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {/* foot */}
        <div className="join w-full flex justify-center pt-2">
          <button
            className="join-item btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
            «
          </button>
          <button className="join-item btn">Pagina {currentPage}</button>
          <button
            className="join-item btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(customers.length / customersPerPage)
            }>
            »
          </button>
        </div>
      </div>
    </>
  );
}

export default UsersTable;
