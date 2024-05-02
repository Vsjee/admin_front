import { useState } from 'react';
import { Kid } from '../../../../core/types/kids_types';
import { date_parser_util } from '../../../../utils/date_parser_util';
import { useCustomerStore } from '../../../../zustand/customerStore';
import { useNavigate } from 'react-router-dom';
import kidsService from '../../../../core/services/kids_service';
import { ToastContainer, toast } from 'react-toastify';
import { time } from 'echarts';

interface Props {
  kids: Kid[];
}

function UserKidsTable({ kids }: Props) {
  const [selectedKid, setSelectedKid] = useState<Kid>({} as Kid);

  const customerState = useCustomerStore((state) => state.customer);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const kidsPerPage = 3;
  const indexOfLastCustomer = currentPage * kidsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - kidsPerPage;
  const currentKids = kids.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const openKidInfoModal = (kid: Kid) => {
    setSelectedKid(kid);

    (
      document.getElementById('modal_kid_info') as HTMLDialogElement
    ).showModal();
  };

  const openKidActivationModal = (kid: Kid) => {
    setSelectedKid(kid);

    (
      document.getElementById('modal_kid_activation') as HTMLDialogElement
    ).showModal();
  };

  return kids.length !== 0 ? (
    <>
      <KidInfoModal kid={selectedKid} />
      <KidActivationModal kid={selectedKid} />

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Perfiles de niños</th>
              <th>Edad</th>
              <th>Genero</th>
              <th>Fecha de creacion</th>
              <th>Fecha de actualizacion</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {currentKids.map((kid) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={kid.avatar} alt={kid.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{kid.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{kid.years}</div>
                </td>
                <td>
                  <div className="font-bold">{kid.gender}</div>
                </td>
                <td>
                  <div className="font-bold">
                    {date_parser_util(kid.creation_date)}
                  </div>
                </td>
                <td>
                  <div className="font-bold">
                    {date_parser_util(kid.modification_date)}
                  </div>
                </td>
                <th>
                  <button
                    className="btn btn-outline btn-primary btn-xs"
                    onClick={() => openKidInfoModal(kid)}>
                    detalle
                  </button>
                </th>
                <th>
                  <span
                    className={
                      kid.is_active
                        ? 'btn btn-outline btn-success  btn-xs'
                        : 'btn btn-outline btn-error  btn-xs'
                    }
                    onClick={() => openKidActivationModal(kid)}>
                    {kid.is_active ? 'Perfil activo' : 'Perfil inactivo'}
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
        {kids.length > 3 ? (
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
              disabled={currentPage === Math.ceil(kids.length / kidsPerPage)}>
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
            , no tiene perfiles de niños creados aun.
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
  kid: Kid;
}

function KidInfoModal({ kid }: PropsModal) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('');

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log({ name, age, gender });

    updateKidById(name, age, gender);
  };

  const updateKidById = (name: string, age: number, gender: string) => {
    if (kid.name !== name) kid.name = name;
    if (kid.years !== age) kid.years = age;
    if (kid.age !== age) kid.age = age;
    if (kid.gender !== gender) kid.gender = gender;

    kidsService
      .updateKidById(kid)
      .then((response) => {
        console.log(response);
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
      })
      .then((error) => {
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
        id="modal_kid_info"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {!isEditing ? (
            <>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Informacion niño</h3>
                <div
                  className="swap-on btn btn-xs btn-outline btn-primary  text-white"
                  onClick={toggleEditing}>
                  Editar
                </div>
              </div>
              <div className="py-4">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-circle w-24 h-24">
                      <img src={kid.avatar} alt={kid.name} />
                    </div>
                  </div>
                  <div>
                    <div>Id: {kid._id}</div>
                    <div>Nombre: {kid.name}</div>
                    <div>Edad: {kid.years}</div>
                    <div>
                      Genero:{' '}
                      {kid.gender === 'male' ? 'Masculino' : ' Femenino'}
                    </div>
                    <div>
                      Fecha de creacion:{' '}
                      {kid.creation_date
                        ? date_parser_util(kid.creation_date)
                        : 'Fecha no valida'}
                    </div>
                    <div>
                      Fecha ultima actualizacion:
                      {kid.creation_date
                        ? date_parser_util(kid.modification_date)
                        : 'Fecha no valida'}
                    </div>
                    <div>
                      Acepto los T&C:
                      {kid.t_c && kid.t_c.length !== 0 ? 'Si' : 'No'}
                    </div>
                    <span
                      className={
                        kid.is_active
                          ? 'badge badge-outline badge-success btn-xs'
                          : 'badge badge-outline badge-error btn-xs'
                      }>
                      {kid.is_active ? 'Perfil activo' : 'Perfil inactivo'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  {kid.family_context && kid.family_context.length !== 0 ? (
                    <div className="flex flex-col">
                      <span className="font-bold">Familiares</span>
                      <div className="flex flex-wrap gap-2">
                        {kid.family_context.map((context) => (
                          <label className="badge badge-outline">
                            {context}
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {kid.personal_context && kid.personal_context.length !== 0 ? (
                    <div className="flex flex-col">
                      <span className="font-bold">Gustos personales</span>
                      <div className="flex flex-wrap gap-2">
                        {kid.personal_context.map((context) => (
                          <label className="badge badge-outline">
                            {context}
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {kid.socioemotional_context &&
                  kid.socioemotional_context.length !== 0 ? (
                    <div className="flex flex-col">
                      <span className="font-bold">Socioemocional</span>
                      <div className="flex flex-wrap gap-2">
                        {kid.socioemotional_context.map((context) => (
                          <label className="badge badge-outline">
                            {context}
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}
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
              <div className="p-5">
                <form className="flex flex-col gap-5">
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
                      placeholder="Nombre"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>

                  {/* age */}
                  <select
                    className="select select-bordered w-full "
                    value={age}
                    onChange={(event) => setAge(Number(event.target.value))}>
                    <option disabled selected>
                      Edad
                    </option>
                    {[...Array(15).keys()].map((age) => (
                      <option>{age + 1}</option>
                    ))}
                  </select>

                  {/* gender */}
                  <select
                    className="select select-bordered w-full "
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}>
                    <option disabled selected>
                      Genero
                    </option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </form>

                <button
                  className="btn btn-outline btn-primary"
                  onClick={handleFormSubmit}>
                  Actualizar
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

function KidActivationModal({ kid }: PropsModal) {
  const activateOrDeactivateKid = () => {
    if (kid.is_active) {
      kid.is_active = false;
    } else {
      kid.is_active = true;
    }
    console.log(kid);

    kidsService
      .updateActivateOrDeactivateKid(kid)
      .then((response) => {
        console.log(response);
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
        id="modal_kid_activation"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {kid.is_active ? (
            <div className="p-5 flex flex-col justify-center items-center gap-5">
              <h3 className="font-bold text-lg">
                {kid.name ?? 'No registra nombre'}
              </h3>
              <div className="avatar">
                <div className="mask mask-hexagon w-40 h-40">
                  <img src={kid.avatar} alt={kid.name} />
                </div>
              </div>
              <button
                className="btn btn-outline btn-error"
                onClick={activateOrDeactivateKid}>
                Desactivar
              </button>
            </div>
          ) : (
            <div className="p-5 flex flex-col justify-center items-center gap-5">
              <h3 className="font-bold text-lg">
                {kid.name ?? 'No registra nombre'}
              </h3>
              <div className="avatar">
                <div className="mask mask-hexagon w-40 h-40">
                  <img src={kid.avatar} alt={kid.name} />
                </div>
              </div>
              <button
                className="btn btn-outline btn-success"
                onClick={activateOrDeactivateKid}>
                Activar
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

export default UserKidsTable;
