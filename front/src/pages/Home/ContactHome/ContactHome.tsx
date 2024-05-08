import './_ContactHome.scss';
import { ResponseData } from './types';
import { useState } from 'react';
import ServerResponse from '../../../components/ServerResponse/ServerResponse';
import { sendEmail } from '../../../services/EmailService';

function ContactHome() {

    const imgContact: string = require("../../../assets/images/contactHome.png");
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });

    const handleEmailSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        let formObject: any = {};

        formData.forEach((value, key) => {
            formObject[key] = value
        });

      
        if (formObject.subject !== "false") {
            formObject.receiver = process.env.REACT_APP_EMAIL_REMITENT;

            let resStatus = 0;

            setResponseData({
                status: resStatus,
                response: ""
            });
            sendEmail(formObject).then((res: Response) => {
                resStatus = res.status;
                return res.json();
            }).then((data) => {
                setResponseData({
                    status: resStatus,
                    response: data.message
                });
            })

        }


    }

    return (
        <section id="contact-home-container">
            <article id="contact-img-container">
                <img src={imgContact} alt="Imagen Contacto" />
            </article>
            <article id='contact-form-container'>
                <h3>Contacta con nosotros</h3>
                <form id='contact-form' onSubmit={handleEmailSubmit}>
                    <input type="text" id="name" placeholder='Nombre' />
                    <div id="telmail">
                        <input type="tel" id="telephone" placeholder='Teléfono' />
                        <input type="email" id="emailc" name="sender" placeholder='Correo electrónico' required />
                    </div>
                    <div id="msgbtn">
                        <div className='form-group-select'>
                            <select name="subject" id="asunt" required defaultValue={"false"}>
                                <option value="false">Seleccione un asunto...</option>
                                <option value="doubt">Dudas y sugerencias</option>
                                <option value="comercial">Información Comercial</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>
                        <textarea name="message" placeholder='Su mensaje' required></textarea>
                        <button type="submit">Enviar mensaje</button>
                    </div>
                </form>
            </article>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}

        </section>
    )

}


export default ContactHome;