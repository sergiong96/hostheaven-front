import './_About.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function AboutUs() {

    const imgCompany: string = require('../../assets/images/aboutCompany.jpg');
    const imgCompany2: string = require('../../assets/images/aboutCompany2.jpg');
    const logo: string = require("../../assets/logo/logo.png");
    const team1: string = require('../../assets/images/romb1.png');
    const team2: string = require('../../assets/images/romb2.png');
    const team3: string = require('../../assets/images/romb3.png');
    const team4: string = require('../../assets/images/romb4.png');
    const team5: string = require('../../assets/images/romb5.png');
    const team6: string = require('../../assets/images/romb6.png');
    const team7: string = require('../../assets/images/romb7.png');
    const team8: string = require('../../assets/images/romb8.png');
    const team9: string = require('../../assets/images/romb9.png');


    return (
        <>
            <Header />
            <main id="aboutUs-page">
                <section id="about-company-container">
                    <article>
                        <p>Iniciamos nuestro proyecto en el año 2002 y, desde entonces, no hemos dejado de trabajar para ofrecer el mejor servicio para nuestros clientes. Nuestra cartera de más de 3000 usuarios nos avalan, así como un crecimiento exponencial desde nuestra fundación.</p>
                        <img src={imgCompany2} alt="Equipo de Francia" title="Equipo de Francia" />
                    </article>
                    <article>
                        <img src={imgCompany} alt="Técnico de Bélgica" title="Técnico de Bélgica" />
                        <p>  En 2005, HostHeaven lanzó sus primeros servidores dedicados y, en 2010, introdujo sus soluciones de hosting VPS. Hoy en día, con más de 100 empleados y centros de datos en varias ubicaciones alrededor del mundo, HostHeaven sigue siendo fiel a sus raíces</p>
                    </article>
                </section>
                <section id="company-numbers">
                    <h3>Nuestro progreso, en números</h3>
                    <div>
                        <div>
                            <p>+3000</p>
                            <hr />
                            <p>Clientes por todo el mundo</p>
                        </div>
                        <div>
                            <p>+1000</p>
                            <hr />
                            <p>Proyectos finalizados</p>
                        </div>
                        <div>
                            <p>5</p>
                            <hr />
                            <p>Datacenters</p>
                        </div>
                        <div>
                            <p>15</p>
                            <hr />
                            <p>Oficinas</p>
                        </div>
                        <div>
                            <p><i className="fa-solid fa-infinity"></i></p>
                            <hr />
                            <p>Motivación para ofrecer lo mejor</p>
                        </div>

                    </div>

                </section>
                <section id="about-team-container">
                    <article>
                        <p>Nos esforzamos por brindar una experiencia de usuario excepcional, desde la configuración inicial hasta la atención al cliente continua. Nuestro equipo está aquí para ayudarte en cada paso del camino, ya sea que necesites asistencia técnica, consejos sobre optimización del rendimiento o simplemente tengas preguntas sobre nuestros servicios.</p>
                    </article>
                    <article id="rombhus-container" title="Equipo de Málaga">
                        <div>
                            <span><img src={team1} alt="Team 1" /></span>
                            <span><img src={team2} alt="Team 2" /></span>
                            <span><img src={team3} alt="Team 3" /></span>
                        </div>
                        <div>
                            <span><img src={team4} alt="Team 4" /></span>
                            <span><img src={team5} alt="Team 5" /></span>
                            <span><img src={team6} alt="Team 6" /></span>
                        </div>
                        <div>
                            <span><img src={team7} alt="Team 7" /></span>
                            <span><img src={team8} alt="Team 8" /></span>
                            <span><img src={team9} alt="Team 9" /></span>
                        </div >
                    </article >


                    <article id="logo-container">
                        <p>Tu éxito</p>
                        <img src={logo} alt="Logo" />
                        <p>nuestro hosting</p>
                    </article>
                </section >
            </main >
            <Footer />
        </>
    );
};

export default AboutUs;