import reportsService from '../../core/services/reports_service';
import { ToastContainer, toast } from 'react-toastify';

function DashboardHeader() {
  const createGlobalReportPDF = async () => {
    reportsService
      .getGlobalReport()
      .then((response) => {
        if (response === 200) {
          toast.success('Reporte generado satisfactoriamente.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        } else {
          toast.error(
            'No se pudo general el reporte global, intenta nuevamente.',
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
          <a className="text-xl">Dashboard de analítica general</a>
        </div>
        <div className="flex-none">
          <button className="btn  btn-ghost" onClick={createGlobalReportPDF}>
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

export default DashboardHeader;
