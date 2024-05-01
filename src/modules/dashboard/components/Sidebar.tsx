import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const history = useNavigate();

  const handleLogout = () => {
    history('/');
  };

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"></label>
      <div className="p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
        <div>
          <div className={'flex justify-end lg:hidden'}>
            <label htmlFor="my-drawer-2" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>
          <ul className="menu">
            <li>
              <label htmlFor="my-drawer-2" className="cursor-pointer">
                Home
              </label>
            </li>
          </ul>
        </div>
        <div className="menu place-content-center">
          <li>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-primary cursor-pointer">
              Logout
            </button>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
