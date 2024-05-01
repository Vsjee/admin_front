function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li>
          <label htmlFor="my-drawer-2" className="cursor-pointer">
            Home
          </label>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
