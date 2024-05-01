import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import check from '../../assets/icons/check.svg';
import question from '../../assets/icons/question.svg';
import { IServiceData } from '../../interfaces/services.interfaces';
import { Link} from 'react-router-dom';
import { publicRoutes } from '../../models';


interface Props {
  service: IServiceData;
}

function ServiceCard({ service }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className='relative sm:w-80 w-70 mt-2 h-fit rounded-md bg-dark-gray text-white box-border flex flex-col items-center'>
      <h2 className='text-green-500 text-center uppercase text-2xl mt-7'>{service.title}</h2>
      <p className='text-4xl text-center font-sans font-medium mt-3'>
        ${service.prices[0].toLocaleString('es-CO')}
      </p>
      <p className='w-3/4 mx-auto text-sm text-center my-5 text-gray-400'>{service.slogan}</p>

      <Typography
        className='absolute w-4 bottom-20'
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      ><img src={question} alt="" /></Typography>
      <div>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography
            style={{ width: '300px', fontSize: '0.75rem', textAlign: 'center', backgroundColor: '#4a4e51', color: 'white' }}
            sx={{ p: 1 }}>
            {service.plus}
          </Typography>
        </Popover>
      </div>

      <div className='h-52'>
        {service.characteristics.map((item, i) => (
          <ul className='list-none' key={i}>
            <li className='text-sm my-1.5 flex font-sans'>
              <img src={check} className='mr-2 w-4 h-4 my-auto' />
              {item}
            </li>
          </ul>
        ))}
      </div>
      <Link to={publicRoutes.DETAILS+`/${service.id}`} className='flex items-center justify-center h-12 w-10/12 rounded mx-auto font-bold bottom-5 my-5 border-2 bg-green-600 border-green-600 text-xs hover:bg-green-700 hover:border-green-700 duration-500'>¡LO QUIERO!</Link>
    </div>
  );    
}

export default ServiceCard;
