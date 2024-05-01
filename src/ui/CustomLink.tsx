import { NavLink } from 'react-router-dom';
import './customLink.css';

interface Props {
  route: string;
  text: string;
  color: 'white' | 'green';
  type: 'menu' | 'simple';
}

function CustomLink({ route, text, color, type }: Props) {
  let style = '';

  if (type === 'menu') {
    const stylesMenu = `block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-${color}-4 ease-in duration-300`;
    style = stylesMenu;
  } else {
    if (color === 'green') {
      const stylesSimple = `hover:text-white text-${color}-4 ease-in duration-300`;
      style = stylesSimple;
    } else {
      const stylesSimple = `text-white hover:text-${color}-4 ease-in duration-300`;
      style = stylesSimple;
    }
  }

  return (
    <NavLink to={route} className={style}>
      {text}
    </NavLink>
  );
}
export default CustomLink;
