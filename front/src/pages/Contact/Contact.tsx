import './_Contact.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Contact() {
    return (
        <>
            <Header />
            <main id="contact-page">
                <section id="contact-info">
                    <p>Llámanos al teléfono +34 675865845</p>
                    <p>O utiliza el formulario de contacto y nuestro equipo responderá en menos de 24 horas</p>
                </section>
                <section id="contact-form">
                    <form action="#">

                        <article id="form-data-1">
                            <div>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" />
                            </div>

                            <div>
                                <label htmlFor="telf">Teléfono</label>
                                <input type="tel" id="telf" />
                            </div>

                            <div>
                                <label htmlFor="mail">Correo electrónico</label>
                                <input type="email" id="mail" />
                            </div>

                        </article>
                        <article id="form-data-2">
                            <div>
                                <label htmlFor="motiv">Motivo</label>
                                <select name="motivo" id="motiv">
                                    <option value="contrato">Contratación del servicio</option>
                                    <option value="soporte">Soporte</option>
                                    <option value="errores">Fallos e incidencias</option>
                                    <option value="dudas">Dudas y sugerencias</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="client">¿Eres cliente?</label>
                                <select name="esCliente" id="client">
                                    <option value="yes">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                        </article>
                        <article id="form-data-3">
                            <textarea name="" id="" rows={8}></textarea>
                            <button type="button">Enviar</button>
                        </article>

                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Contact;