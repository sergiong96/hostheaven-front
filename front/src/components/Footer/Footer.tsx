import './_Footer.scss';

function Footer() {

    const logo = require('../../assets/logo/logo.png');
    return (
        <footer>
            <section id="footer-logo">
                <img src={logo} alt="Logo HostHeaven" />
            </section>
            <section id="footer-social">
                <article id="footer-social-icons">
                    <ul>
                        <li><i className="fa-brands fa-facebook" title="Facebook"></i></li>
                        <li><i className="fa-brands fa-x-twitter" title="X"></i></li>
                        <li><i className="fa-brands fa-instagram" title="Instagram"></i></li>
                        <li><i className="fa-brands fa-linkedin" title="Linkedin"></i></li>
                    </ul>
                </article>
                <article id="footer-social-links">
                    <ul>
                        <li><a href="#">Términos y Condiciones</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Política de Cookies</a></li>
                    </ul>
                </article>
            </section>
            <section id="footer-copy">
                <p>HostHeaven &copy; | 2024 | Made By Sergio Navarro</p>
            </section>
        </footer>
    );
};
export default Footer;