import { useNavigate } from 'react-router-dom';
import { Customer } from '../../../../core/types/customers_types';
import reportsService from '../../../../core/services/reports_service';
import { ToastContainer, toast } from 'react-toastify';

interface Props {
  customer: Customer;
}

function UserDetailHeader({ customer }: Props) {
  const navigate = useNavigate();

  const createCustomerReportPDF = async (customerId: string) => {
    reportsService
      .getCustomerReportById(customerId)
      .then((response) => {
        if (response === 200) {
          toast.success(
            `Reporte del usuario ${customer._id} generado satisfactoriamente.`,
            {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
        } else {
          toast.error(
            `No se pudo general el reporte para el usuario ${customer._id}, intenta nuevamente.`,
            {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
        }
      })
      .then((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ToastContainer />

      <div className="navbar bg-base-100">
        <div className="flex-1">
          <button className="btn btn-ghost mr-3" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
        <div className="flex-none">
          <button
            className="btn  btn-ghost"
            onClick={() => createCustomerReportPDF(customer._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l4 4m0 0l-4-4m4 4H8"
              />
            </svg>
            Reporte PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default UserDetailHeader;
