import { INecessities } from '../../interfaces/home.interfaces';

interface Props {
  data: INecessities;
}

function NecessitiesCard({ data }: Props) {
  return (
    <div className='flex flex-col justify-center items-center text-center gap-1 sm:p-0 px-5 text-white ease-linear duration-500'>
      <picture>
        <img src={data.image} alt={data.title} width={40} height={40} />
      </picture>
      <h1>{data.title}</h1>
      <p className='text-white-1'>{data.text}</p>
    </div>
  );
}
export default NecessitiesCard;
