import { Footer, Navbar } from '../../components';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function DashboardRootLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default DashboardRootLayout;
