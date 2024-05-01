import 'animate.css';
import { Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NotFoundRoute } from './utils';
import { Footer, Navbar } from './components';
import { publicRoutes } from './models';


const Home = lazy(() => import('./pages/Home/Home'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Details = lazy(() => import('./pages/Details/Details'));

function App() {
  return (
    <section>
      <Navbar />
      <Suspense fallback={<h1>...loading</h1>}>
        <NotFoundRoute>
          <Route path={publicRoutes.HOME} element={<Home />} />
          <Route path={publicRoutes.CONTACT} element={<Contact />} />
          <Route path={publicRoutes.DETAILS + '/:id'} element={<Details/>}/>
        </NotFoundRoute>
      </Suspense>
      <Footer />
    </section>
  );
}
export default App;
