import './_modifyService.scss';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResponseData, HostingPackageTrade } from "../types";
import { updateTrade, deleteTrade } from "../../../services/TradeService";
import ServerResponse from "../../../components/ServerResponse/ServerResponse";



function ModifyService({ contractedPackage, userID }: { contractedPackage: HostingPackageTrade | undefined, userID: number }) {

    const [updatedPackage, setUpdatedPackage] = useState<any>();
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });
    const navigate = useNavigate();



    useEffect(() => {
        if (contractedPackage) {
            setUpdatedPackage({
                id_user: userID,
                id_trade: contractedPackage.id_trade,
                hostingPackage: contractedPackage.hostingPackage,
                amount: contractedPackage.amount
            });
        }
    }, [contractedPackage]);

    const showEditDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#edit-service-dialog");
        if (dialog) {
            document.body.classList.add("overflow");
            dialog.showModal();
        }
    }

    const closeEditDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#edit-service-dialog");
        if (dialog) {
            document.body.classList.remove("overflow");
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
        closeEditDialog();

        let resStatus = 0;
        handleServerResponse(resStatus, "");
        updateTrade(updatedPackage).then((res) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            handleServerResponse(resStatus, data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch((res: Response) => {
            resStatus = res.status;
            res.json().then((error) => {
                handleServerResponse(resStatus, error.message);
            });
        });
    }

    const showDeleteDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#delete-service-dialog");
        if (dialog) {
            document.body.classList.add("overflow");
            dialog.showModal();
        }
    }

    const closeDeleteDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#delete-service-dialog");
        if (dialog) {
            document.body.classList.remove("overflow");
            dialog.close();
        }
    }

    const deleteService = (event: React.FormEvent) => {
        event.preventDefault();
        closeDeleteDialog();
        let id_trade = 0;
        let id_user = 0;

        if (contractedPackage) {
            id_trade = contractedPackage.id_trade;
            id_user = userID;
        }


        let resStatus = 0;
        handleServerResponse(resStatus, "");
        deleteTrade(id_trade, id_user).then((res) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            handleServerResponse(resStatus, data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch((res: Response) => {
            resStatus = res.status;
            res.json().then((error) => {
                handleServerResponse(resStatus, error.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
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
        <article id="edit-service">
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
                        <button type="button" onClick={closeDeleteDialog}>X</button>
                        <form onSubmit={deleteService}>
                            <p>¿Seguro que desea eliminar su servicio activo?</p>
                            <button type="submit">Darse de baja</button>
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
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
        </article>
    )
}

export default ModifyService;