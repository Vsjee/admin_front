import { IProduct } from '.';

// interface for the service cards
export interface IServiceData {
  id: number;
  title: 'Landing Page' | 'Primera Web' | 'Web Empresarial';
  slogan: string;
  plus: string;
  prices: number[];
  characteristics: string[];
}

// interface for the web pages
export interface ISelectionServicesData {
  landingPage: IProduct[];
  firstWeb: IProduct[];
  bussinesWeb: IProduct[];
}

// export interface IServicesData {
//   title: string;
//   price: number;
//   image: string;
// }
