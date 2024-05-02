import { IMenuRoutes } from '../interfaces/menu.interfaces';
import { publicRoutes } from './routes';

export const menuRoutes: IMenuRoutes[] = [
  {
    route: `${publicRoutes.ADMIN_PROFILE}`,
    text: 'Perfil Admin',
  },
  {
    route: `${publicRoutes.DASHBOARD}`,
    text: 'Dashboard',
  },
  {
    route: `${publicRoutes.ANALYTICS_USERS}`,
    text: 'Analitica Usuarios',
  },
];
