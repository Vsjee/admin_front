import bgefect from '../../assets/images/bgefect.png';
import example from '../../assets/images/example.png';
import { differenceList, necessitiesList } from '../../models/home.model';
import rectangleHome from '../../assets/images/rectangleHome.png';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { servicesData } from '../../data/servicesData';
import AccordionFAQ from '../../components/AccordionFAQ/AccordionFAQ';
import NecessitiesCard from '../../components/NecessitiesCard/NecessitiesCard';

function Home() {
  return (
    <section>
      {/* background efect */}
      <img src={bgefect} alt="" className="fixed inset-0 object-cover -z-10" />

      {/* welcome section */}
      <section className="grid place-content-center h-screen md:px-20 sm:px-10 px-3 gap-10 pt-10 z-10">
        <div className="animate__animated animate__fadeIn flex flex-col justify-center items-center lg:px-20 px-0  text-left sm:text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl ease-linear duration-500">
            ¡Conecta con tus clientes ahora!
          </h1>
          <p className="text-gray-400">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat.
          </p>
        </div>
        <div className="flex gap-5 justify-center text-xs">
          <a
            href="#plans__section"
            className="animate__animated animate__fadeInLeft py-3 px-4 rounded-full border border-green-2 bg-green-2 text-black hover:bg-green-1 hover:border-green-1 hover:text-white ease-in duration-300">
            EMPEZAR AHORA
          </a>

          <a
            href="#diff__section"
            className="animate__animated animate__fadeInRight py-3 px-4 rounded-full border border-green-2 bg-transparent text-green-2 hover:bg-bg-accent hover:text-green-4 hover:border-green-4 ease-in duration-300">
            VER MÁS
          </a>
        </div>
      </section>

      {/* diff section */}
      <section
        id="diff__section"
        className="md:px-20 sm:px-10 px-3 gap-10 pt-10 md:pb-40 sm:pb-20 pb-10 z-10">
        {/* dif list */}
        <article className="sm:mb-20 mb-10">
          <ul className="flex sm:flex-row flex-col sm:justify-between items-center gap-5">
            {differenceList.map((item, i) => (
              <li className="flex gap-2 sm:text-base text-xl" key={i}>
                <img src={item.image} alt="icono" width={25} height={25} />
                {item.title}
              </li>
            ))}
          </ul>
        </article>

        {/* grid */}
        <article className="grid md:grid-cols-2 gap-2 grid-cols-1 place-content-center items-center relative">
          {/* lefr */}
          <picture>
            <img
              src={example}
              alt="Ejemplos"
              className=" xl:-top-28 lg:-left-96 lg:-top-10 md:-top-5 md:-left-64 md:absolute relative z-0"
            />
          </picture>
          {/* right */}
          <article className="flex flex-col md:gap-20 gap-12 md:pl-8">
            <div className="grid gap-4 md:mt-10 mt-0 xl:text-right text-left">
              <h1 className="text-5xl">
                Haz la <span className="text-green-2">diferencia</span> con tu
                contenido
              </h1>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A eaque
                sunt ullam, placeat alias eum debitis odio perspiciatis ipsam
                laboriosam voluptatum illum cumque nam recusandae vel fugit?
                Eos, nobis harum?
              </p>
            </div>
            <a
              href="#inspiration__section"
              className="text-center w-24 border self-center border-green-2 text-green-2 rounded-full hover:border-green-4 hover:bg-bg-accent hover:text-green-4 ease-in duration-300">
              ⇩
            </a>
          </article>
        </article>
      </section>

      {/* inspiration section */}
      <section
        id="inspiration__section"
        className="grid place-content-center -scroll-mt-12 gap-5 relative py-20 text-center bg-green-2 z-10">
        <h1 className="absolute px-2 sm:text-6xl text-4xl w-full right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-linear duration-500">
          Impulsa tu negocio a otro nivel, nosotros nos encargamos.
        </h1>
        <picture>
          <img src={rectangleHome} alt="inspiration" />
        </picture>
        <a
          href="#plans__section"
          className="py-2 text-sm place-self-center border-2 rounded-full border-white w-44 hover:bg-green-1 hover:border-green-1 ease-in duration-300">
          VER PLANES
        </a>
      </section>

      {/* plans section */}
      <section id="plans__section" className="p-1 z-10 md:mt-10 mt-3 sm:px-10">
        <h1 className="text-3xl text-center text-white mt-8 mb-4">
          ELIGE TU WEB
        </h1>
        <hr className="w-1/4 mx-auto border-2" />
        <article className="h-full mx-auto flex lg:flex-row flex-col justify-around items-center gap-4 mt-6">
          {servicesData.map((item, i) => (
            <ServiceCard service={item} key={i} />
          ))}
        </article>
      </section>

      {/* necessities section */}
      <section className="grid lg:gap-0 gap-10 lg:grid-cols-2 grid-cols-1 my-10 py-20 xl:px-44 md:px-20 sm:px-8 px-4 ease-linear duration-500">
        <div className="flex flex-col justify-center text-white">
          <h1 className="sm:text-6xl text-5xl ease-linear duration-300">Nos</h1>
          <h1 className="sm:text-5xl text-4xl ease-linear duration-300">
            enfocamos
          </h1>
          <h1 className="sm:text-6xl text-5xl ease-linear duration-300">
            en tus
          </h1>
          <h1 className="sm:text-5xl text-4xl text-green-3 ease-linear duration-300">
            necesidades
          </h1>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 grid-cols-1">
          {necessitiesList.map((item, i) => (
            <NecessitiesCard data={item} key={i} />
          ))}
        </div>
      </section>

      {/* faq section */}
      <section className="flex flex-col gap-8 my-10 py-20 xl:px-44 md:px-20 sm:px-8 px-4 justify-center items-center bg-green-2 ease-linear duration-500 z-10">
        <div className="text-center">
          <h1 className="text-green-4">FAQs</h1>
          <h1 className="md:text-6xl sm:text-5xl text-4xl text-white ease-linear duration-500">
            PREGUNTAS FRECUENTES
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <AccordionFAQ />
        </div>
      </section>
    </section>
  );
}
export default Home;
