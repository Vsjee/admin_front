import { Routes, Route } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function NotFoundRoute({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path='*' element={<h1>La pagina no existe</h1>} />
    </Routes>
  );
}
export default NotFoundRoute;
