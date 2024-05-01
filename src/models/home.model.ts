import { IDifferenceItem, IFAQ, INecessities } from '../interfaces/home.interfaces';

import consistency from '../assets/icons/consistency.svg';
import accesibility from '../assets/icons/accesibility.svg';
import conectivity from '../assets/icons/conectivity.svg';

import folderFav from '../assets/icons/folder-favorite.svg';
import chart1 from '../assets/icons/chart-bar.svg';
import chart2 from '../assets/icons/chart-3.svg';
import board from '../assets/icons/board-2.svg';

export const differenceList: IDifferenceItem[] = [
  {
    title: 'Consistencia',
    image: consistency,
  },
  {
    title: 'Accesibilidad',
    image: accesibility,
  },
  {
    title: 'Conectividad',
    image: conectivity,
  },
];

export const faqsList: IFAQ[] = [
  {
    question: '¿En cuánto tiempo estara mi página web?',
    answer:
      'El tiempo de desarrollo de una página web variara dependiendo del proyecto elejido para las landing pages en 1 semana, Primera Web 2 semanas y Web empresarial 3 semanas, en caso de ser un servicio personalizado a los tiempos anteriores agregale entre 7 a 15 mas.',
  },
  {
    question: '¿Mi pagina se adaptara a todos los dispositivos?',
    answer:
      'Si nosotros manejamos diseño web responsivo el cual se adapta automáticamente a diferentes dispositivos y tamaños de pantalla, brindando una experiencia óptima al usuario. Esto va incluido para todos los sevicios que ofrecemos.',
  },
  {
    question:
      '¿Qué plataforma o lenguaje de programación utilizan para desarrollar las páginas web?',
    answer:
      'Utilizamos una variedad de tecnologías y lenguajes de programación, como HTML, CSS, JavaScript, junto con plataformas populares como WordPress, Shopify, entre otras. La elección depende de las necesidades específicas del proyecto.',
  },
  {
    question: '¿Ofrecen servicios de alojamiento web y registro de dominio?',
    answer:
      'Sí, podemos ayudarte con el registro de dominio y proporcionar servicios de alojamiento web confiables. Ofrecemos diferentes opciones para adaptarnos a tus necesidades y garantizar que tu sitio web esté en línea de manera segura y estable. (recuerda para todos los servicios te damos hosting y un dominio por un año)',
  },
  {
    question: '¿Cómo puedo solicitar una cotización para el desarrollo de mi página web?',
    answer:
      'Puedes solicitar una cotización fácilmente contactándonos a través de nuestro formulario de contacto en nuestro sitio web, por correo electrónico o por teléfono. Proporciona detalles sobre tus requerimientos y nos pondremos en contacto contigo lo antes posible para discutir tu proyecto y brindarte una cotización precisa.',
  },
  {
    question: '¿Proporcionan servicios de mantenimiento y actualización de sitios web?',
    answer: 'Sí, en nuestro negocio ofrecemos servicios de mantenimiento y actualización de sitios web. Entendemos que mantener tu página web actualizada y funcionando sin problemas es esencial para tu presencia en línea. Nuestro equipo se encarga de realizar tareas como la actualización de contenidos, la corrección de errores, la optimización de rendimiento y la implementación de medidas de seguridad para garantizar que tu sitio web esté siempre en óptimas condiciones.',
  },
  {
    question: '¿Ofrecen servicios de optimización para buscadores (SEO) en sus desarrollos web?',
    answer: 'Por supuesto, parte de nuestro enfoque en el desarrollo de páginas web es garantizar que sean amigables para los motores de búsqueda. El SEO (Search Engine Optimization) es crucial para mejorar la visibilidad de tu sitio web en los resultados de búsqueda. Implementamos las mejores prácticas de SEO en el diseño y desarrollo de tu página web, como la optimización de palabras clave relevantes, la mejora de la estructura del sitio, la optimización de velocidad de carga y la configuración adecuada de metadatos. Esto ayuda a que tu sitio web sea más fácilmente indexado y clasificado por los motores de búsqueda, lo que puede aumentar la visibilidad y la generación de tráfico orgánico hacia tu sitio.',
  },
  {
    question: '¿Qué opciones de pago aceptan y cuáles son sus políticas de facturación?',
    answer: 'Aceptamos diversas opciones de pago, como tarjetas de crédito, transferencias bancarias y servicios de pago en línea. Nuestras políticas de facturación varían, pero generalmente requerimos un depósito inicial para comenzar el proyecto y luego establecemos pagos parciales según los hitos alcanzados en el desarrollo de la página web. Te proporcionaremos una factura detallada para cada transacción y estaremos disponibles para aclarar cualquier duda que tengas relacionada con el proceso de facturación.',
  },
  {
    question: '¿Cómo puedo solicitar soporte técnico en caso de tener problemas con mi página web?',
    answer: 'Si tienes algún problema con tu página web, simplemente contáctanos a través de nuestro número teléfonico. También puedes comunicarte con nosotros por correo electrónico o WhatsApp, y nuestro equipo de soporte estará encantado de ayudarte a resolver cualquier inconveniente que puedas enfrentar. Proporcionaremos una asistencia oportuna y profesional para asegurarnos de que tu sitio web funcione correctamente y esté disponible para tus usuarios.',
  },
  {
    question: '¿Tienen algún tipo de garantía o política de satisfacción del cliente?',
    answer: 'Sí, valoramos la satisfacción del cliente y nos esforzamos por ofrecer un servicio de calidad. Dependiendo de los términos y condiciones específicos de nuestro contrato, ofrecemos garantías en el trabajo realizado, como solucionar cualquier problema técnico o error relacionado con la página web durante un período de tiempo determinado. Además, estamos comprometidos a escuchar tus comentarios y trabajar contigo para asegurarnos de que estés satisfecho con el resultado final.',
  },
  {
    question:
      '¿Qué tipo de información necesitan de mi empresa para iniciar el desarrollo de la página web?',
    answer: 'Para iniciar el desarrollo de tu página web, necesitaremos información sobre tu empresa, como el logotipo, los colores de marca, el contenido y las imágenes que deseas incluir. También es importante comprender tus objetivos y requisitos específicos, como la funcionalidad deseada, el público objetivo y los elementos clave que deseas destacar en tu sitio web.',
  },
  {
    question:
      '¿Cuál es su proceso de trabajo y cómo me mantendrán informado durante el desarrollo de mi proyecto?',
    answer: 'Durante todo el proceso te mantendremos informado de los avances y cambios realizados en tu proyecto. Estaremos disponibles para responder tus preguntas y proporcionarte actualizaciones regulares sobre el progreso. Utilizaremos diferentes métodos de comunicación, como correo electrónico, llamadas o reuniones en persona, según sea conveniente para ti. Nuestro objetivo es mantener una comunicación fluida y abierta para asegurarnos de que estés involucrado en cada etapa y satisfecho con el resultado final de tu página web.',
  },
];

export const necessitiesList: INecessities[] = [
  {
    image: chart1,
    title: 'Ventas',
    text: 'Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.',
  },
  {
    image: board,
    title: 'Inducción',
    text: 'Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.',
  },
  {
    image: folderFav,
    title: 'Calidad',
    text: 'Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.',
  },
  {
    image: chart2,
    title: 'Resultados',
    text: 'Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.',
  },
];
