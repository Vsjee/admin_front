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
                      book.is_story_approved
                        ? 'badge badge-outline badge-success  btn-xs'
                        : 'badge badge-outline badge-error  btn-xs'
                    }>
                    {book.is_story_approved
                      ? 'Libro Aprobado'
                      : 'Libro Sin Aprobar'}
                  </span>
                </th>
                <th>
                  <span
                    className={
                      book.is_active
                        ? 'btn btn-outline btn-success  btn-xs'
                        : 'btn btn-outline btn-error  btn-xs'
                    }
                    onClick={() => openBookActivationModal(book)}>
                    {book.is_active ? 'Libro Activo' : 'Libro Sin Activar'}
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    updateBookById(title);
  };

  const updateBookById = (title: string) => {
    if (book.story_title !== title) book.story_title = title;

    booksService
      .updateBookById(book)
      .then((response) => {
        toast.success('Actualizado correctamente', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });

        toggleEditing();

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error al actualizar, intenta nuevamente.', {
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
        id="modal_book_info"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {!isEditing ? (
            <>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Informacion libro</h3>
                <div
                  className="swap-on btn btn-xs btn-outline btn-primary  text-white"
                  onClick={toggleEditing}>
                  Editar
                </div>
              </div>
              <div className="py-4">
                <div className="flex flex-col gap-3">
                  {/* img */}
                  <div className="card w-full h-40 bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src={serverImgStgUrl + book.covers?.mini}
                        alt={book.customer_id}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
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

                  {/* info */}
                  <div className="flex flex-col gap-5 pt-5">
                    <div>Id: {book._id}</div>
                    <div>Titulo: {book.story_title}</div>
                    <div className="w-full overflow-wrap break-word">
                      Audio:{' '}
                      {book.story_audio_path
                        ? 'Posee audio'
                        : 'No registra audio'}
                    </div>
                    <div>
                      Este libro es de: {book.kid_name ?? 'No registar nombre'}
                    </div>
                    <div className=" h-60 overflow-scroll">
                      Historia: {book.story_text}
                    </div>

                    <div>
                      Fecha de creacion:{' '}
                      {book.creation_date
                        ? date_parser_util(book.creation_date)
                        : 'Fecha no valida'}
                    </div>
                    <div>
                      Fecha ultima actualizacion:{' '}
                      {book.creation_date
                        ? date_parser_util(book.modification_date!)
                        : 'Fecha no valida'}
                    </div>

                    <div className="flex gap-3">
                      <span
                        className={
                          book.is_active
                            ? 'badge badge-outline badge-success btn-xs'
                            : 'badge badge-outline badge-error btn-xs'
                        }>
                        {book.is_active ? 'Libro Activo' : 'Libro Inactivo'}
                      </span>

                      <span
                        className={
                          book.is_story_approved
                            ? 'badge badge-outline badge-success btn-xs'
                            : 'badge badge-outline badge-error btn-xs'
                        }>
                        {book.is_story_approved ? 'Aprobado' : 'Sin aprobar'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn"
                    onClick={() => {
                      window.location.reload();
                    }}>
                    Cerrar
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Editando</h3>
                <div
                  className="swap-off btn btn-xs btn-outline btn-error  text-white"
                  onClick={toggleEditing}>
                  Cancelar
                </div>
              </div>
              <div className="p-5 grid gap-5">
                <form className="flex flex-col  gap-5">
                  {/* name */}
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Titulo"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </label>
                </form>

                {title !== '' ? (
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={handleFormSubmit}>
                    Actualizar
                  </button>
                ) : (
                  <button className="btn btn-outline btn-primary" disabled>
                    Actualizar
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

function BookActivationModal({ book }: PropsModal) {
  const activateOrDeactivateBook = () => {
    booksService
      .updateBookStatus(book)
      .then((res) => {
        console.log(res);

        toast.success('Actualizado correctamente', {
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
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error al actualizar, intenta nuevamente.', {
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
        id="modal_book_activation"
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
                  <span className="flex gap-5">
                    <form>
                      <button className="btn btn-outline">Cancelar</button>
                    </form>
                    <button
                      className={
                        book.is_active
                          ? 'btn btn-error text-white'
                          : 'btn btn-success text-white'
                      }
                      onClick={activateOrDeactivateBook}>
                      {book.is_active ? 'Desactivar libro' : 'Activar libro'}
                    </button>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
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
