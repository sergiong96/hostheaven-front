import { Link } from "react-router-dom";
import HorizontalNavbar from "../HorizontalNavbar/HorizontalNavbar";
import './_Header.scss';
import CountDownTimer from "./CountDownTimer/CountDownTimer";

function Header({ imagePath }: { imagePath: string }) {

    const logo = require("../../assets/logo/logo.png");

    return (
        <header style={{ backgroundImage: `url(${imagePath})` }}>
            <HorizontalNavbar />
            <section id="header-content">
                <article>
                    <h1>15% de descuento en toda la web</h1>
                    <h2>¡Por tiempo limitado!</h2>
                    <div className="counter-header"><CountDownTimer /></div>
                </article>
                <article>
                    <img src={logo} alt="" />
                </article>


            </section>
            {!window.location.href.includes("hostingPlans") ? <button type="button" className="cta"><Link to="/hostingPlans">Explora nuestros planes de hosting</Link></button> : ""}
        </header>
    )
}

export default Header;