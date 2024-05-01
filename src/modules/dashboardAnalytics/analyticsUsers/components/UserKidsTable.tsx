import { useState } from 'react';
import { Kid } from '../../../../core/types/kids_types';
import { date_parser_util } from '../../../../utils/date_parser_util';
import { useCustomerStore } from '../../../../zustand/customerStore';
import { useNavigate } from 'react-router-dom';

interface Props {
  kids: Kid[];
}

function UserKidsTable({ kids }: Props) {
  const customerState = useCustomerStore((state) => state.customer);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 4;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentKids = kids.slice(indexOfFirstCustomer, indexOfLastCustomer);

  return kids.length !== 0 ? (
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
                <button className="btn btn-outline btn-primary btn-xs">
                  detalle
                </button>
              </th>
              <th>
                <span
                  className={
                    kid.is_active
                      ? 'badge badge-outline badge-success btn-xs'
                      : 'badge badge-outline badge-error btn-xs'
                  }>
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
      {kids.length >= 4 ? (
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
              currentPage === Math.ceil(kids.length / customersPerPage)
            }>
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

export default UserKidsTable;
