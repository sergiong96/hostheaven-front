import './_HorizontalNavbar.scss';
import User from './User/User';
import { Link } from 'react-router-dom';

function HorizontalNavbar() {

    
    return (
        <nav id="main-navBar">
            <Link to="/"><i className="fa-solid fa-house"></i></Link>
            <ul className='outer-list'>
            <li><Link to="/glosary">Glosario</Link></li>
                <li><Link to="/hostingPlans">Planes de hosting</Link></li>
                <li><Link to="/hostingPlans#custom-creator-container">Personaliza tu plan</Link></li> {/*Añadir # para que navegue directamente al formulario de plan personalizado*/}
                <li><Link to="/about">Sobre nosotros</Link></li>
                <li><Link to="/contact">Contáctanos</Link></li>
            </ul>
            <User />
        </nav>
    )
}

export default HorizontalNavbar;