import './_adminArea.scss';
import { useEffect, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { getAllUsers } from "../../../services/UserService";
import { getPendingTickets, resolveTicket } from '../../../services/EmailService';
import { User, Ticket, ResponseData } from '../types';
import ServerResponse from '../../../components/ServerResponse/ServerResponse';

function AdminArea() {

    const [showContent, setShowContent] = useState<string>("");
    const navigate: NavigateFunction = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket>();
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });


    useEffect(() => {
        const tab = new URLSearchParams(window.location.search).get("tab") || "new-users";
        setShowContent(tab);

        getAllUsers().then((res: Response) => {
            return res.json();
        }).then((data) => {
            setUsers(data);
        }).catch((res: Response) => {
            console.log(res)
        });

        getPendingTickets().then((res: Response) => {
            return res.json();
        }).then((data) => {
            setTickets(data);
        }).catch((res: Response) => {
            console.log(res)
        });
    }, [])


    const openTab = (tab: string) => {
        setShowContent(tab);
        navigate(`?tab=${tab}`);
    }



    const openTicket = (event: React.MouseEvent<HTMLLIElement>) => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#response-ticket-dialog");
        const clickedTicket = tickets.find(ticket => parseInt(event.currentTarget.id) === ticket.id_email_request);
        setSelectedTicket(clickedTicket);
        if (dialog) {
            dialog.showModal();
        }

    }

    const closeDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#response-ticket-dialog");
        if (dialog) {
            dialog.close();
        }
    }

    const sendResponse = (event: React.FormEvent) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget as HTMLFormElement);
        let formObject: any = {};

        formData.forEach((value, key) => {
            formObject[key] = value
        })

        let resStatus = 0;
        handleServerResponse(resStatus, "");
        resolveTicket(formObject.id_ticket, formObject.response).then((res: Response) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            handleServerResponse(resStatus, data.message);
            closeDialog();
        }).catch((res: Response) => {
            resStatus = res.status;
            res.json().then((error) => {
                handleServerResponse(resStatus, error.message);
                closeDialog();
            });
        });
    }

    const handleServerResponse = (status: number, message: string) => {
        setResponseData({
            status: status,
            response: message
        });
    }

    return (
        <>
            <section id="admin-tabs">
                <ul>
                    <li id="new-users-tab" className={showContent === "new-users" ? "active" : ""} onClick={() => openTab("new-users")}>Nuevos usuarios</li>
                    <li id="view-tickets-tab" className={showContent === "view-tickets" ? "active" : ""} onClick={() => openTab("view-tickets")}>Ver tickets</li>
                </ul>
            </section>
            <section id="admin-tab-content">
                {showContent === "new-users" &&
                    <article>
                        <h2>Nuevos usuarios registrados</h2>
                        {users?.map((user) => (
                            <table key={user.id_user}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Correo electrónico</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{user.id_user}</td>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                    </article>
                }

                {showContent === "view-tickets" &&
                    <article>
                        <h2>Tickets no resueltos</h2>

                        {tickets.length > 0 &&
                            <ul>
                                {tickets.map((ticket: Ticket) => (
                                    <li key={ticket.id_email_request} id={ticket.id_email_request.toString()} onClick={openTicket}>ID Usuario: {ticket.id_user}</li>
                                ))}
                            </ul>
                        }

                        <dialog id="response-ticket-dialog">
                            <button type="button" onClick={closeDialog}>X</button>
                            <form onSubmit={sendResponse}>
                                <div>
                                    <label htmlFor="sol">Solicitud</label>
                                    <input type="text" id="sol" defaultValue={selectedTicket?.message} readOnly />
                                </div>

                                <div>
                                    <label htmlFor="resp">Respuesta</label>
                                    <input type="text" name="response" id="resp" />
                                </div>
                                <input type="hidden" name="id_ticket" defaultValue={selectedTicket?.id_email_request} />
                                <button type="submit">Enviar respuesta</button>
                            </form>

                        </dialog>

                    </article>
                }
            </section>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
        </>

    )
}

export default AdminArea;