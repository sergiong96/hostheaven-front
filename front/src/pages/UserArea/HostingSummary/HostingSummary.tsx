import './_hostingSummary.scss';
import ServerResponse from "../../../components/ServerResponse/ServerResponse";
import { sendEmail } from "../../../services/EmailService";
import { ResponseData, UserData, HostingPackageTrade } from "../types";
import { useEffect, useState } from "react";


function HostingSummary({ userData, contractedPackage }: { userData: UserData, contractedPackage: HostingPackageTrade | undefined }) {

    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });
    const [daysLeft, setDaysLeft] = useState<number>(0);


    useEffect(() => {
        if (contractedPackage) {
            getDaysToFinish(contractedPackage.date_end);
        }
    }, [contractedPackage])


    const getDaysToFinish = (end_string: string) => {
        let end_date: Date;
        end_date = new Date(end_string);
        let actual_date = new Date();
        let days_left = Math.round((end_date.getTime() - actual_date.getTime()) / (1000 * 60 * 60 * 24));
        setDaysLeft(days_left);
    }


    const openTicketDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#ticketDialog");
        if (dialog) {
            document.body.classList.add("overflow");
            dialog.showModal();
        }
    }

    const closeTicketDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#ticketDialog");
        if (dialog) {
            document.body.classList.remove("overflow");
            dialog.close();
        }
    }

    const sendTicket = (event: React.FormEvent) => {
        event.preventDefault();
        closeTicketDialog();

        const formData = new FormData(event.target as HTMLFormElement);
        let formObject: any = {};

        formData.forEach((value, key) => {
            formObject[key] = value
        });
        
        formObject.id_user = userData.id_user;
        formObject.sender = userData.email;
        formObject.receiver = process.env.REACT_APP_EMAIL_REMITENT;
        formObject.subject = "ticket";


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


    return (
        <article id="hosting-summary">
            <div id="userData">
                <p>Sus datos:</p>
                <p>{userData.name + " " + userData.surname}</p>
                <p>{userData.email}</p>
                <p>{userData.phone_number?userData.phone_number:""}</p>
            </div>
            <div id="sendTicket">
                <p>Envía una petición el equipo de soporte:</p>
                <button type="button" onClick={openTicketDialog}>Enviar Ticket</button>
                <dialog id="ticketDialog">
                    <button type="button" onClick={closeTicketDialog}>X</button>
                    <p>Nuestro equipo responderá en menos de 12 horas.</p>
                    <form onSubmit={sendTicket}>
                        <textarea name="message" placeholder='Detalle su problema' rows={5} cols={5}></textarea>
                        <button type="submit">Enviar Ticket</button>
                    </form>
                </dialog>
            </div>
            {contractedPackage ? (<div id="serviceData">
                <p>Su servicio activo:</p>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tipo</td>
                                <td>{contractedPackage?.hostingPackage.hosting_type}</td>
                            </tr>
                            <tr>
                                <td>Almacenamiento</td>
                                <td>{contractedPackage?.hostingPackage.storage}GB</td>
                            </tr>
                            <tr>
                                <td>Dominios</td>
                                <td>{contractedPackage?.hostingPackage.domains}</td>
                            </tr>
                            <tr>
                                <td>Bases de Datos</td>
                                <td>{contractedPackage?.hostingPackage.databases}</td>
                            </tr>
                            <tr>
                                <td>Cuentas de correo</td>
                                <td>{contractedPackage?.hostingPackage.email_account}</td>
                            </tr>
                            <tr>
                                <td>Ancho de banda</td>
                                <td>{contractedPackage?.hostingPackage.monthly_bandwidth}GB</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                            <tr>
                                <td>¿Soporte?</td>
                                <td>{contractedPackage?.hostingPackage.technical_support_24h ? "Sí" : "No"}</td>
                            </tr>
                            <tr>
                                <td>¿Migración?</td>
                                <td>{contractedPackage?.hostingPackage.migration ? "Sí" : "No"}</td>
                            </tr>
                            <tr>
                                <td>¿SSL?</td>
                                <td>{contractedPackage?.hostingPackage.ssl ? "Sí" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Fecha Inicio</td>
                                <td>{contractedPackage?.date_start}</td>
                            </tr>
                            <tr>
                                <td>Fecha Fin</td>
                                <td>{contractedPackage?.date_end}</td>
                            </tr>
                            <tr>
                                <td>Facturación</td>
                                <td>{contractedPackage?.amount}€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <label htmlFor="days-left">Días restantes para la renovación:</label>
                    <input type="text" id="days-left" readOnly value={daysLeft} />
                </div>
            </div>) : (<div id="without-service">
                <p>Aún no dispone de ningún servicio activo</p>
            </div>

            )}

            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
        </article>
    )
}


export default HostingSummary;