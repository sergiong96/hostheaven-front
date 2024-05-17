import './_modifyUser.scss';
import { useEffect, useState } from "react";
import DeleteUserForm from "./DeleteUserForm/DeleteUserForm";
import { ResponseData, PasswordData, UserData } from "../types";
import { updateData, changePassword } from "../../../services/UserService";
import ServerResponse from "../../../components/ServerResponse/ServerResponse";


function ModifyUser({ userData, userID }: { userData: UserData, userID: number }) {

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });
    const [newPassword, setNewPassword] = useState<PasswordData>({
        id_user: -1,
        actual_pass: "",
        new_pass: "",
        new_pass_rep: ""
    });
    const [userDataUpdated, setUserDataUpdated] = useState<UserData>({
        id_user: 0,
        name: "",
        surname: "",
        email: "",
        password: "",
        payment_method: "",
        payment_reference: "",
        phone_number: ""
    });


    useEffect(() => {
        setNewPassword({
            ...newPassword,
            id_user: userID
        });
        setUserDataUpdated(userData);
    }, [userData]);


    const handleChangeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDataUpdated({
            ...userDataUpdated,
            [name]: value
        })
    }

    const showDeleteForm = () => {
        document.body.classList.add("overflow");
        setShowDeleteModal(true);
    }

    const closeDeleteModal = () => {
        document.body.classList.remove("overflow");
        setShowDeleteModal(false);
    }

    const handleSubmitUserData = (event: React.FormEvent) => {
        event.preventDefault();
        let resStatus = 0;

        handleServerResponse(resStatus, "");
        updateData(userDataUpdated).then((res: Response) => {
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

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewPassword({
            ...newPassword,
            [name]: value
        });
    }

    const handleSubmitPassword = (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword.new_pass !== newPassword.new_pass_rep) {
            alert("La contraseña repetida no coincide con la nueva contraseña");
        } else {
            let resStatus = 0;

            handleServerResponse(resStatus, "");
            changePassword(newPassword).then((res: Response) => {
                resStatus = res.status;
                return res.json();
            }).then((data) => {
                handleServerResponse(resStatus, data.message);
            }).catch((res: Response) => {
                resStatus = res.status;
                res.json().then((error) => {
                    handleServerResponse(resStatus, error.message);
                });
            });
        }
    }

    const handleServerResponse = (status: number, message: string) => {
        setResponseData({
            status: status,
            response: message
        });
    }

    return (
        <article id="user-data">
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
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
        </article>
    )
}


export default ModifyUser;