import { useNavigate } from 'react-router-dom';
import { useCustomerStore } from '../../../../zustand/customerStore';
import { useState } from 'react';
import { date_parser_util } from '../../../../utils/date_parser_util';
import { IBook } from '../../../../core/types/books_types';
import { serverImgStgUrl } from '../../../../config/environment_stg_config';

interface Props {
  books: IBook[];
}

function UserBooksTable({ books }: Props) {
  const customerState = useCustomerStore((state) => state.customer);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3;
  const indexOfLastBooks = currentPage * booksPerPage;
  const indexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBooks, indexOfLastBooks);

  return books.length !== 0 ? (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Libros</th>
            <th>Titulo</th>
            <th>Fecha de creacion</th>
            <th>Fecha de actualizacion</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((book) => (
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-hexagon w-16 h-26">
                      <img
                        src={serverImgStgUrl + book.covers?.mini}
                        alt={book.customer_id}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <p
                  className="font-bold w-[220px] overflow-hidden text-overflow-ellipsis flex-wrap"
                  title={book.story_title}>
                  {book.story_title}
                </p>
              </td>
              <td>
                <div className="font-bold">
                  {date_parser_util(book.creation_date!)}
                </div>
              </td>
              <td>
                <div className="font-bold">
                  {date_parser_util(book.modification_date!)}
                </div>
              </td>
              <th>
                <button className="btn btn-outline btn-primary btn-xs">
                  detalle
                </button>
              </th>
              <th>
                <span
                  className={
                    book.is_active
                      ? 'badge badge-outline badge-success btn-xs'
                      : 'badge badge-outline badge-error btn-xs'
                  }>
                  {book.is_active ? 'Aprobado' : 'Sin aprobar'}
                </span>
              </th>
              <th>
                <button className="btn btn-square btn-outline btn-xs btn-error">
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
      {books.length > 3 ? (
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
            disabled={currentPage === Math.ceil(books.length / booksPerPage)}>
            »
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="flex justify-center align-middle">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="text-center">
            {' '}
            <div className="w-100 mask mask-hexagon">
              <img
                src="https://stg-srv.soybumii.com/images/kids/bumii/c_1.png"
                alt="Bumii"
              />
            </div>
            El usuario{' '}
            <span className="badge badge-outline badge-primary">
              {customerState._id}
            </span>
            , no tiene libros creados aun.
          </p>
          <button
            className="btn btn-primary btn-outline"
            onClick={() => navigate(-1)}>
            volver
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserBooksTable;
