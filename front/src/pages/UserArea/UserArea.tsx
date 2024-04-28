import './_UserArea.scss';
import { useEffect, useState } from 'react';
import fetchEndpoints from '../../services/VirtualminService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getUserData, updateData, changePassword, getContractedPackage } from '../../services/UserService';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import DeleteUserForm from './DeleteUserForm/DeleteUserForm';
import ServerResponse from '../../components/ServerResponse/ServerResponse';
import { HostingPackageTrade, ResponseData, PasswordData, UserData } from './types';

function UserArea() {

    const [showContent, setShowContent] = useState<string>("user-data");
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
                }
            });
        }

        setNewPassword({
            ...newPassword,
            id_user: userID
        });

    }, [userID])

    //Llamada a servicio para obtener los datos del paquete de hosting contratado.

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
        }

        )
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

    return (
        <>
            <Header />
            <main>
                <section id="tabs">
                    <ul>
                        <li id="user-data-tab" className={showContent === "user-data" ? "active" : ""} onClick={() => openTab("user-data")}>Datos Usuario</li>
                        <li id="hosting-summary-tab" className={showContent === "hosting-summary" ? "active" : ""} onClick={() => openTab("hosting-summary")}>Resumen Servicio</li>
                        <li id="hosting-portal-tab" className={showContent === "hosting-portal" ? "active" : ""} onClick={() => openTab("hosting-portal")}>Portal Hosting</li>
                    </ul>
                </section>
                <section id="tab-content">
                    <article id="user-data" className={showContent === "user-data" ? "active" : ""}>
                        <p>Aquí puede ver y modificar sus datos</p>

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

                    <article id="hosting-summary" className={showContent === "hosting-summary" ? "active" : ""}>
                        <p>Aquí puede ver las características de su servicio activo</p>
                        {contractedPackage ? (<ul>
                            <li><p>Almacenamiento</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.storage+"GB"}</span></li>
                            <li><p>Bases de datos</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.databases}</span></li>
                            <li><p>Cuentas de correo</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.email_account}</span></li>
                            <li><p>Tipo de hosting</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.hosting_type}</span></li>
                            <li><p>Número de dominios</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.domains}</span></li>
                            <li><p>Ancho de banda</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.monthly_bandwidth+"GB/mes"}</span></li>
                            <li><p>¿Soporte técnico 24h?</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.technical_support_24h ? "Sí":"No"}</span></li>
                            <li><p>¿Migración?</p><span>=&gt;</span><span> {contractedPackage.hostingPackage.migration ? "Sí":"No"}</span></li>
                            <li><p>Fecha inicio</p><span>=&gt;</span><span> {contractedPackage.date_start}</span></li>
                            <li><p>Fecha fin</p><span>=&gt;</span><span> {contractedPackage.date_end}</span></li>
                            <li><p>Facturación</p><span>=&gt;</span><span> {contractedPackage.amount+"€"}</span></li>
                        </ul>) : (
                            <div>
                                <div>
                                    <p>No dispone de ningún servicio de hosting activo.</p>
                                    <p>Contrátelo ahora y contruya su presencia en línea</p>
                                    <button type="button"><Link to="/hostingPlans">Ver servicios de hosting <i className="fa-solid fa-eye"></i></Link></button>
                                </div>
                            </div>
                        )}

                    </article>
                </section>
            </main>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
            <Footer />
        </>
    )
}


export default UserArea;

