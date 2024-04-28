import HorizontalNavbar from "../HorizontalNavbar/HorizontalNavbar";
import './_Header.scss';
import CountDownTimer from "./CountDownTimer/CountDownTimer";

function Header() {

    //CAMBIAR, EN DISTINTAS PÁGINAS SE DEBEN MOSTRAR DISTINTAS IMÁGENES
    const imgUrl = require('../../assets/images/clouds.jpeg');

    return (
        <header>
            <HorizontalNavbar />
            <section id="header-content">
                <article>
                    <h1>15% de descuento en toda la web</h1>
                    <h2>¡Por tiempo limitado!</h2>
                    <div className="counter-header"><CountDownTimer/></div>
                </article>
                <article>
                    <img src={imgUrl} alt="Imagen Header"></img>
                </article>
            </section>

        </header>
    )
}

export default Header;