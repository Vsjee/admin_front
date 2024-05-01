import { IProduct } from '../interfaces';
import { ISelectionServicesData, IServiceData } from '../interfaces/services.interfaces';

// data for the service cards
export const servicesData: IServiceData[] = [
  {
    id: 1,
    title: 'Landing Page',
    slogan: 'Perfecta para darte a conocer y mostrar tu trabajo',
    plus: 'La carta de presentación digital que cautiva en segundos. Atrapa a tus visitantes con un diseño elegante, contenido relevante y un llamado a la acción irresistible.',
    prices: [650000, 1000000],
    characteristics: [
      'Hosting y dominio por un año',
      'Certificado de seguridad',
      '1 Slider Home',
      '3 a 4 Secciones',
      'Hasta 6 imagenes',
      'Formulario de contacto',
    ],
  },
  {
    id: 2,
    title: 'Primera Web',
    slogan: 'Perfecta para marcas personales o un solo producto',
    plus: 'La puerta de entrada al mundo online. Crea tu propio espacio en la web de manera intuitiva y sin conocimientos técnicos. Tu presencia digital nunca fue tan sencilla.',
    prices: [900000, 1250000],
    characteristics: [
      'Hosting y dominio por un año',
      'Certificado de seguridad',
      '2 Slider Home',
      '4 a 5 Secciones',
      'Hasta 8 imagenes',
      'Formulario de contacto',
    ],
  },
  {
    id: 3,
    title: 'Web Empresarial',
    slogan: 'Genial para los que ya van para grandes ligas',
    plus: 'La herramienta que lleva tu negocio al siguiente nivel. Potencia tu imagen corporativa, muestra tus productos y servicios, y genera confianza en tus clientes con una web profesional y adaptada a tus necesidades.',
    prices: [1150000, 1500000],
    characteristics: [
      'Hosting y dominio por un año',
      'Certificado de seguridad',
      '1 Slider Home',
      '5 a 8 Secciones',
      'Hasta 12 imagenes',
      'Formulario de contacto',
      'Sube tu portafolio',
    ],
  },
];

// data for the web pages
export const selectWebService: ISelectionServicesData = {
  landingPage: [
    {
      id: 1,
      title: 'Landing Page',
      description: 'descripcion',
      type: 'Diseño 1',
      price: 650000,
      category: 'Web',
      images: [],
      quantity: 0,
      url: '',
    },
    {
      id: 2,
      title: 'Landing Page Personalizada 🦄',
      description: 'descripcion',
      type: 'Personalizado',
      price: 1000000,
      category: 'Web',
      images: [],
      quantity: 0,
      url: '',
    },
  ],
  firstWeb: [
    {
      id: 11,
      title: 'Primera Web',
      description: 'descripcion',
      type: 'Diseño 1',
      price: 950000,
      category: 'Web',
      images: [],
      quantity: 0,
      url: '',
    },
    {
      id: 12,
      title: 'Primera Web Personalizada 🦄',
      description: 'descripcion',
      type: 'Personalizado',
      price: 1300000,
      category: 'Web',
      images: [],
      quantity: 0,
      url: '',
    },
  ],
  bussinesWeb: [
    {
      id: 21,
      title: 'Web Empresarial',
      description: 'descripcion',
      type: 'Diseño 1',
      price: 1200000,
      category: 'Web',
      images: [],
      quantity: 0,
      url: '',
    },
    {
      id: 22,
      title: 'Web Empresarial Personalizada 🦄',
      description: 'descripcion',
      type: 'Personalizado',
      price: 1550000,
      category: 'Web',
      images: [],
      quantity: 0,
      url: '',
    },
  ],
};

// data for the templates
export const selectTemplateService: IProduct[] = [];
