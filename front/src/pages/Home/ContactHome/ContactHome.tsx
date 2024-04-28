import './_ContactHome.scss';

function ContactHome() {

    const imgContact: string = require("../../../assets/images/contactHome.png");

    return (
        <section id="contact-home-container">
            <article id="contact-img-container">
                <img src={imgContact} alt="Imagen Contacto" />
            </article>
            <article id='contact-form-container'>
                <h3>Contacta con nosotros</h3>
                <form action="#" id='contact-form'>
                    <input type="text" id="name" placeholder='Nombre' />
                    <div id="telmail">
                        <input type="tel" id="telephone" placeholder='Teléfono' />
                        <input type="email" id="emailc" placeholder='Correo electrónico' />
                    </div>
                    <div id="msgbtn">
                        <textarea name="" id="" placeholder='Su mensaje'></textarea>
                        <button type="button">Enviar mensaje</button>
                    </div>
                </form>
            </article>

        </section>
    )

}


export default ContactHome;