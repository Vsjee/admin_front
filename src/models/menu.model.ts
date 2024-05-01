import { IMenuRoutes } from '../interfaces/menu.interfaces';
import { publicRoutes } from './routes';

export const menuRoutes: IMenuRoutes[] = [
  {
    route: `${publicRoutes.SERVICES}`,
    text: 'Servicios',
  },
  {
    route: `${publicRoutes.TECNOLOGIES}`,
    text: 'Tecnologías',
  },
  {
    route: `${publicRoutes.CONTACT}`,
    text: 'Contacto',
  },
  {
    route: `${publicRoutes.ABOUT}`,
    text: 'Nosotros',
  },
];
