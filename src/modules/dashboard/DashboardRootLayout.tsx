import { Footer, Navbar } from '../../components';
import Sidebar from './components/Sidebar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function DashboardRootLayout({ children }: Props) {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Page content */}
        <div className="drawer-content pt-10">{children}</div>

        {/* Drawer content */}
        <Sidebar />
      </div>
    </>
  );
}

export default DashboardRootLayout;
