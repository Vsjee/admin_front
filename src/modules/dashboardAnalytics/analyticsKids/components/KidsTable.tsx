import { Kid } from '../../../../core/types/kids_types';
import { date_parser_util } from '../../../../utils/date_parser_util';

interface Props {
  kids: Kid[];
}

function KidsTable({ kids }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Perfiles de niños</th>
            <th>Id usuario</th>
            <th>Fecha de creacion</th>
            <th>Fecha de actualizacion</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {kids.map((kid) => (
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
                <div className="badge badge-ghost badge-sm">
                  {kid.customer_id != null && kid.customer_id != ''
                    ? kid.customer_id
                    : 'No tiene'}
                </div>
                <br />
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
        {/* foot */}
        <tfoot>
          <tr>
            <th>Perfiles de niños</th>
            <th>Id usuario</th>
            <th>Fecha de creacion</th>
            <th>Fecha de actualizacion</th>s<th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default KidsTable;
