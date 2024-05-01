import './_UserArea.scss';
import React, { useEffect, useState } from 'react';
import fetchEndpoints from '../../services/VirtualminService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getUserData, updateData, changePassword, getContractedPackage } from '../../services/UserService';
import { updateTrade, deleteTrade } from '../../services/TradeService';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import DeleteUserForm from './DeleteUserForm/DeleteUserForm';
import ServerResponse from '../../components/ServerResponse/ServerResponse';
import { HostingPackageTrade, ResponseData, PasswordData, UserData, updatedPackage } from './types';
import { sendEmail } from '../../services/EmailService';

function UserArea() {

    const imgUrl = require("../../assets/images/header/user-header.jpg");
    const [showContent, setShowContent] = useState<string>("hosting-summary");
    const [links, setLink] = useState<any[]>([]);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>(-1);
    const navigate: NavigateFunction = useNavigate();
    const [userData, setUserData] = useState<UserData>({
        id_user: 0,
        name: "",
        surname: "",
        email: "",
        password: "",
        payment_method: "",
        payment_reference: ""
    });
    const [contractedPackage, setContractedPackage] = useState<HostingPackageTrade>();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<PasswordData>({
        id_user: -1,
        actual_pass: "",
        new_pass: "",
        new_pass_rep: ""
    });
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });
    const [daysLeft, setDaysLeft] = useState<number>(0);
    const [updatedPackage, setUpdatedPackage] = useState<any>();


    useEffect(() => {
        const token = localStorage.getItem("sessionToken");

        if (token) {
            const decodifiedToken: JwtPayload = jwtDecode(token);
            const id_user: number = parseInt(decodifiedToken.sub || "-1");
            setUserID(id_user);
        } else {
            navigate("/");
        }
    }, []);


    useEffect(() => {
        if (userID !== -1) {
            getUserData(userID).then((res: Response) => {
                return res.json()
            }).then((data) => {
                setUserData(data);
            });

            getContractedPackage(userID).then((res) => {
                return res.json();
            }).then((data) => {
                if (data) {
                    setContractedPackage(data);
                    setUpdatedPackage({
                        id_user: userID,
                        id_trade: data.id_trade,
                        hostingPackage: data.hostingPackage
                    });
                    getDaysToFinish(data.date_end);
                }
            });
        }

        setNewPassword({
            ...newPassword,
            id_user: userID
        });

    }, [userID])



    const openTab = (tab: string) => {
        setShowContent(tab);
    }


    const getLinks = () => {
        fetchEndpoints().then((data) => {
            if (data.length > 0 && links.length <= 0) {
                const parsedLinks = data.map(endpoint => JSON.parse(endpoint));
                setLink(parsedLinks);
                setShowErrorMessage(false);
            } else if (data.length <= 0) {
                setShowErrorMessage(true);
            }
        })
    }


    const handleChangeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const showDeleteForm = () => {
        setShowDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const handleSubmitUserData = (event: React.FormEvent) => {
        event.preventDefault();
        let resStatus = 0;

        setResponseData({
            status: resStatus,
            response: ""
        });

        updateData(userData).then((res: Response) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            setResponseData({
                status: resStatus,
                response: data.response
            });
        }).catch((error) => {
            setResponseData({
                status: resStatus,
                response: error
            });
        })

    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewPassword({
            ...newPassword,
            [name]: value
        })
    }

    const handleSubmitPassword = (event: React.FormEvent) => {

        event.preventDefault();
        if (newPassword.new_pass !== newPassword.new_pass_rep) {
            alert("La contraseña repetida no coincide con la nueva contraseña");
        } else {
            let resStatus = 0;

            setResponseData({
                status: resStatus,
                response: ""
            });
            changePassword(newPassword).then((res: Response) => {
                resStatus = res.status;
                return res.json();
            }).then((data) => {
                setResponseData({
                    status: resStatus,
                    response: data.response
                });
            })
        }
    }

    const getDaysToFinish = (end_string: string) => {
        let end_date: Date;
        end_date = new Date(end_string);
        let actual_date = new Date();
        let days_left = Math.round((end_date.getTime() - actual_date.getTime()) / (1000 * 60 * 60 * 24));
        setDaysLeft(days_left);
    }

    const showEditDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#edit-service-dialog");
        if (dialog) {
            dialog.showModal();
        }
    }

    const closeEditDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#edit-service-dialog");
        if (dialog) {
            dialog.close();
        }
    }


    const handleChangeUpdatePackage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const parsedValue = parseInt(value);
        const priceUpdatedTarget: HTMLInputElement | null = document.querySelector("input#newprice");

        if (updatedPackage && priceUpdatedTarget) {
            let difference = parsedValue - updatedPackage.hostingPackage[name];
            let input_value: number = parseFloat(priceUpdatedTarget.value);
            if (difference > 0) {
                priceUpdatedTarget.value = (input_value + 1.2).toFixed(2).toString();
            } else {
                priceUpdatedTarget.value = (input_value - 1.2).toFixed(2).toString();
            }

            setUpdatedPackage({
                ...updatedPackage,
                amount: parseFloat(priceUpdatedTarget.value),
                hostingPackage: {
                    ...updatedPackage.hostingPackage,
                    [name]: parsedValue
                }
            });

        }

    }


    const handleSubmitUpdatePackage = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(updatedPackage)

        let resStatus = 0;
        setResponseData({
            status: resStatus,
            response: ""
        });
        updateTrade(updatedPackage).then((res) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            setResponseData({
                status: resStatus,
                response: data.response
            });

        });
    }

    const deleteService = (event: React.FormEvent) => {
        event.preventDefault();
        let id_trade = 0;
        let id_user = 0;

        if (contractedPackage) {
            id_trade = contractedPackage.id_trade;
            id_user = userID;
        }


        let resStatus = 0;
        setResponseData({
            status: resStatus,
            response: ""
        });
        deleteTrade(id_trade, id_user).then((res) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            setResponseData({
                status: resStatus,
                response: data.response
            });
        })



    }

    const showDeleteDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#delete-service-dialog");
        if (dialog) {
            dialog.showModal();
        }
    }

    const closeDeleteDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#delete-service-dialog");
        if (dialog) {
            dialog.close();
        }
    }

    const openTicketDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#ticketDialog");
        if (dialog) {
            dialog.showModal();
        }
    }

    const closeTicketDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#ticketDialog");
        if (dialog) {
            dialog.close();
        }
    }

    const sendTicket = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        let formObject: any = {};

        formData.forEach((value, key) => {
            formObject[key] = value
        });

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
                response: data.response
            });
        })
    }

    return (
        <>
            <Header imagePath={imgUrl} />
            <main>
                <section id="tabs">
                    <ul>
                        <li id="hosting-summary-tab" className={showContent === "hosting-summary" ? "active" : ""} onClick={() => openTab("hosting-summary")}>Resumen Servicio</li>
                        <li id="user-data-tab" className={showContent === "user-data" ? "active" : ""} onClick={() => openTab("user-data")}>Editar Datos</li>
                        <li id="edit-service-tab" className={showContent === "edit-service" ? "active" : ""} onClick={() => openTab("edit-service")}>Modificar Servicio</li>
                        <li id="hosting-portal-tab" className={showContent === "hosting-portal" ? "active" : ""} onClick={() => openTab("hosting-portal")}>Portal Hosting</li>
                    </ul>
                </section>
                <section id="tab-content">

                    <article id="hosting-summary" className={showContent === "hosting-summary" ? "active" : ""}>
                        <div id="userData">
                            <p>Sus datos:</p>
                            <p>{userData.name + " " + userData.surname}</p>
                            <p>{userData.email}</p>
                            <p>675456755</p>
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
                        <div id="serviceData">
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
                        </div>
                    </article>

                    <article id="user-data" className={showContent === "user-data" ? "active" : ""}>
                        <p>Aquí puede modificar sus datos</p>
                        <div>
                            <form action="#" id="user-data-form" onSubmit={handleSubmitUserData}>
                                <div>
                                    <div>
                                        <label htmlFor="nomb">Nombre</label>
                                        <input type="text" id="nomb" name="name" defaultValue={userData.name} onChange={handleChangeUserData} />
                                    </div>
                                    <div>
                                        <label htmlFor="ape">Apellidos</label>
                                        <input type="text" id="ape" name="surname" defaultValue={userData.surname} onChange={handleChangeUserData} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="mail">Email</label>
                                    <input type="email" id="mail" name="email" defaultValue={userData.email} onChange={handleChangeUserData} />
                                </div>
                                <button type="submit">Actualizar mis datos</button>
                            </form>
                            <form action="#" id="change-pass-form" onSubmit={handleSubmitPassword}>
                                <div>
                                    <label htmlFor="passAct">Contraseña actual</label>
                                    <input type="password" id="passAct" name="actual_pass" onChange={handleChangePassword} />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="passNew">Nueva contraseña</label>
                                        <input type="password" id="passNew" name="new_pass" onChange={handleChangePassword} />
                                    </div>
                                    <div>
                                        <label htmlFor="passRep">Repita la contraseña</label>
                                        <input type="password" id="passRep" name="new_pass_rep" onChange={handleChangePassword} />
                                    </div>
                                </div>
                                <button type="submit">Cambiar contraseña</button>
                            </form>
                        </div>
                        <button type="button" id="delete-user" onClick={showDeleteForm}>Quiero eliminar mi cuenta</button>
                        {showDeleteModal && <DeleteUserForm user_id={userID} onClose={closeDeleteModal} />}
                    </article>

                    <article id="edit-service" className={showContent === "edit-service" ? "active" : ""}>
                        {contractedPackage ? (
                            <article>

                                <div>
                                    <button type="button" onClick={showEditDialog}>Actualizar mi servicio</button>
                                    <button type="button" onClick={showDeleteDialog}>Eliminar mi servicio</button>
                                </div>

                                <dialog id="edit-service-dialog">
                                    <button type="button" onClick={closeEditDialog}>X</button>
                                    <form onSubmit={handleSubmitUpdatePackage}>
                                        <div><label htmlFor="stor">Almacenamiento</label><input type="number" min={0} name="storage" id="stor" defaultValue={contractedPackage.hostingPackage.storage} onChange={handleChangeUpdatePackage} /></div>
                                        <div><label htmlFor="datab">Bases de datos</label><input type="number" min={0} name="databases" id="datab" defaultValue={contractedPackage.hostingPackage.databases} onChange={handleChangeUpdatePackage} /></div>
                                        <div><label htmlFor="dom">Dominios</label><input type="number" name="domains" min={0} id="dom" defaultValue={contractedPackage.hostingPackage.domains} onChange={handleChangeUpdatePackage} /></div>
                                        <div><label htmlFor="emailac">Cuentas de correo</label><input type="number" min={0} name="email_account" id="emailac" defaultValue={contractedPackage.hostingPackage.email_account} onChange={handleChangeUpdatePackage} /></div>
                                        <div><label htmlFor="bandw">Ancho de banda</label><input type="number" min={0} name="monthly_bandwidth" id="bandw" defaultValue={contractedPackage.hostingPackage.monthly_bandwidth} onChange={handleChangeUpdatePackage} /></div>
                                        <div><label htmlFor="actualprice">Precio Actual</label><input type="number" id="actualprice" defaultValue={contractedPackage.amount} readOnly /></div>
                                        <div><label htmlFor="newprice">Precio Actualizado</label><input type="number" id="newprice" defaultValue={contractedPackage.amount} readOnly /></div>
                                        <button type="submit">Editar Servicio</button>
                                    </form>
                                </dialog>

                                <dialog id="delete-service-dialog">
                                    <form onSubmit={deleteService}>
                                        <p>¿Seguro que desea eliminar su servicio activo?</p>
                                        <button type="submit">Darse de baja</button>
                                        <button type="button" onClick={closeDeleteDialog}>Cancelar</button>
                                    </form>
                                </dialog>
                            </article>
                        ) : (
                            <div>
                                <div>
                                    <p>No dispone de ningún servicio de hosting activo.</p>
                                    <p>Contrátelo ahora y contruya su presencia en línea</p>
                                    <button type="button"><Link to="/hostingPlans">Ver servicios de hosting <i className="fa-solid fa-eye"></i></Link></button>
                                </div>
                            </div>
                        )}
                    </article>

                    <article id="hosting-portal" className={showContent === "hosting-portal" ? "active" : ""}>
                        <p>Para acceder a su panel de control, pulse sobre el botón 'Generar enlace' y se le proporcionará un link de acceso seguro</p>

                        <div id="link-provider">
                            <button type="button" onClick={getLinks}>Generar Enlace <i className="fa-solid fa-arrows-spin"></i></button>
                            {!showErrorMessage ? (links.map((endpoint) => (
                                <span key={endpoint.id_endpoint}><i className="fa-solid fa-dungeon"></i><a href={endpoint.public_url} target='_blank' rel="noreferrer">Ir al Portal</a></span>
                            ))
                            ) : (<p>No se han encontrado enlaces o ha ocurrido un error durante su generación</p>)
                            }
                        </div>
                    </article>

                </section>
            </main>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
            <Footer />
        </>
    )
}


export default UserArea;

