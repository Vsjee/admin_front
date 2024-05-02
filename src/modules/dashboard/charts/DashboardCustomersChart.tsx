import bumii_reading from '../../../assets/images/home/bumii_reading.jpg';
import bumii_with_kid from '../../../assets/images/home/bumii_with_kid.jpg';
import { IBook } from '../../../core/types/books_types';
import { Customer } from '../../../core/types/customers_types';
import { Kid } from '../../../core/types/kids_types';

interface Props {
  customers: Customer[];
  books: IBook[];
  kids: Kid[];
}

function DashboardCustomersChart({ customers, books, kids }: Props) {
  return (
    <div>
      <h1 className="text-xl pb-3">Cifras</h1>
      <div className="flex gap-5">
        {' '}
        <div className="card w-full  h-64 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src={bumii_reading}
              alt="Bumii kids"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </figure>
          <div className="card-body">
            <div
              className="radial-progress text-primary"
              style={
                {
                  '--value': '70',
                  '--size': '12rem',
                  '--thickness': '15px',
                } as React.CSSProperties
              }
              role="progressbar">
              <h1 className="text-xl text-center">
                Total cuentas <br />
                <span className="text-4xl">{customers.length}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="card w-full  h-64 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src={bumii_with_kid}
              alt="Bumii kids"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </figure>
          <div className="card-body">
            <div
              className="radial-progress text-accent"
              style={
                {
                  '--value': '60',
                  '--size': '12rem',
                  '--thickness': '15px',
                } as React.CSSProperties
              }
              role="progressbar">
              <h1 className="text-xl text-center">
                Total libros <br />
                <span className="text-4xl">{books.length}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="card w-full  h-64 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src={bumii_reading}
              alt="Bumii kids"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </figure>
          <div className="card-body">
            <div
              className="radial-progress text-primary"
              style={
                {
                  '--value': '50',
                  '--size': '12rem',
                  '--thickness': '15px',
                } as React.CSSProperties
              }
              role="progressbar">
              <h1 className="text-xl text-center">
                Total Niños <br />
                <span className="text-4xl">{kids.length}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCustomersChart;
