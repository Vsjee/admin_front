import { useNavigate } from 'react-router-dom';
import { IBook } from '../../../../core/types/books_types';

interface Props {
  books: IBook[];
  customerId: string;
}

function UserBooksHeader({ books, customerId }: Props) {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <button className="btn btn-ghost mr-3" onClick={() => navigate(-1)}>
          Volver
        </button>
        <a className="text-xl">
          Libros del usuario{' '}
          <span className="badge badge-outline badge-primary">
            {customerId}
          </span>
        </a>
        <a className="text-xl pl-2"> | Total {books.length} </a>
      </div>
      <div className="flex-none">
        <button className="btn  btn-ghost">
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
  );
}

export default UserBooksHeader;
