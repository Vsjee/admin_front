import { useNavigate } from 'react-router-dom';
import { useCustomerStore } from '../../../../zustand/customerStore';
import { useState } from 'react';
import { date_parser_util } from '../../../../utils/date_parser_util';
import { IBook } from '../../../../core/types/books_types';
import { serverImgStgUrl } from '../../../../config/environment_stg_config';
import { ToastContainer, toast } from 'react-toastify';
import booksService from '../../../../core/services/books_service';

interface Props {
  books: IBook[];
}

function UserBooksTable({ books }: Props) {
  const [selectedBook, setSelectedBook] = useState<IBook>({} as IBook);

  const customerState = useCustomerStore((state) => state.customer);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3;
  const indexOfLastBooks = currentPage * booksPerPage;
  const indexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBooks, indexOfLastBooks);

  const openBookInfoModal = (book: IBook) => {
    setSelectedBook(book);

    (
      document.getElementById('modal_book_info') as HTMLDialogElement
    ).showModal();
  };

  const openBookActivationModal = (book: IBook) => {
    setSelectedBook(book);

    (
      document.getElementById('modal_book_activation') as HTMLDialogElement
    ).showModal();
  };

  const openBookDeletionModal = (book: IBook) => {
    setSelectedBook(book);

    (
      document.getElementById('modal_book_deletion') as HTMLDialogElement
    ).showModal();
  };

  return books.length !== 0 ? (
    <>
      <BookInfoModal book={selectedBook} />
      <BookActivationModal book={selectedBook} />
      <BookDeletionModal book={selectedBook} />

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
                  <button
                    className="btn btn-outline btn-primary btn-xs"
                    onClick={() => openBookInfoModal(book)}>
                    detalle
                  </button>
                </th>
                <th>
                  <span
                    className={
                      book.is_active
                        ? 'btn btn-outline btn-success  btn-xs'
                        : 'btn btn-outline btn-error  btn-xs'
                    }
                    onClick={() => openBookActivationModal(book)}>
                    {book.is_active ? 'Aprobado' : 'No aprobado'}
                  </span>
                </th>
                <th>
                  <button
                    className="btn btn-square btn-outline btn-xs btn-error"
                    onClick={() => openBookDeletionModal(book)}>
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
    </>
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

interface PropsModal {
  book: IBook;
}

function BookInfoModal({ book }: PropsModal) {
  return (
    <>
      <ToastContainer />

      <dialog
        id="modal_book_info"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box"></div>
      </dialog>
    </>
  );
}

function BookActivationModal({ book }: PropsModal) {
  return (
    <>
      <ToastContainer />

      <dialog
        id="modal_book_activation"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box"></div>
      </dialog>
    </>
  );
}

function BookDeletionModal({ book }: PropsModal) {
  const deleteBookById = () => {
    booksService
      .deleteBookById(book._id!)
      .then(() => {
        toast.success('Libro eliminado correctamente', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error al eliminar, intenta nuevamente.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      });
  };

  return (
    <>
      <ToastContainer />

      <dialog
        id="modal_book_deletion"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="p-5 flex flex-col justify-center items-center gap-5">
            <div className="card w-full  h-64 bg-base-100 shadow-xl image-full">
              <figure>
                <img
                  src={serverImgStgUrl + book.covers?.mini}
                  alt={book.customer_id}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </figure>
              <div className="card-body grid place-content-center">
                <h1 className="text-xl text-center">
                  <br />
                  <span className="text-4xl">
                    {book.story_title ?? 'No registra nombre'}
                  </span>
                </h1>
              </div>
            </div>

            <p className="text-center">
              Seguro que quieres eliminar este libro? no se podra recuperar
            </p>

            <div className="flex gap-5">
              <form>
                <button className="btn btn-outline btn-ghost">Cancelar</button>
              </form>
              <button
                className="btn btn-error text-white"
                onClick={deleteBookById}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default UserBooksTable;
