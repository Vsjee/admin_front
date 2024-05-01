export interface IProduct {
  id: number;
  title:
    | 'Landing Page'
    | 'Primera Web'
    | 'Web Empresarial'
    | 'Landing Page Personalizada 🦄'
    | 'Primera Web Personalizada 🦄'
    | 'Web Empresarial Personalizada 🦄';
  description: string;
  type: 'Diseño 1' | 'Diseño 2' | 'Diseño' | 'Personalizado';
  price: number;
  category: 'Web' | 'Template';
  images: string[];
  quantity: number;
  url: string;
}
