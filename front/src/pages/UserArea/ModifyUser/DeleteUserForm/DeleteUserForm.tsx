import './_deleteUserForm.scss';
import ServerResponse from '../../../../components/ServerResponse/ServerResponse';
import { useState, useEffect } from 'react';
import { deleteUser } from '../../../../services/UserService';
import { ResponseData, DeleteUserFormProps, DeleteData } from '../../types';
import { useNavigate } from 'react-router-dom';



function DeleteUserForm({ user_id, onClose }: DeleteUserFormProps) {

    const navigate = useNavigate();
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });

    const [deleteData, setDeleteData] = useState<DeleteData>({
        user_id: user_id,
        password: ""
    })

    useEffect(() => {
        showDialog();
    }, []);


    const showDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#delete-dialog");
        if (dialog) {
            dialog.showModal();
        }

    }

    const closeDialog = () => {
        const dialog: HTMLDialogElement | null = document.querySelector("dialog#delete-dialog");
        if (dialog) {
            dialog.close();
            onClose();
        }
    }

    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteData({
            ...deleteData,
            password: event.target.value
        })
    }

    const handleSubmitRemove = (event: React.FormEvent) => {
        event.preventDefault();
        
        let resStatus = 0;
        handleServerResponse(resStatus, "");
        deleteUser(deleteData.user_id, deleteData.password).then((res) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            handleServerResponse(resStatus, data.message);
            setTimeout(() => {
                closeDialog();
                localStorage.removeItem("sessionToken");
                navigate("/");
            }, 2000);
        }).catch((res: Response) => {
            resStatus = res.status;
            res.json().then((error) => {
                handleServerResponse(resStatus, error.message);
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
            <dialog id="delete-dialog">
                <button type="button" onClick={closeDialog}>X</button>
                <form id="delete-account-form" onSubmit={handleSubmitRemove}>
                    <div>
                        <label htmlFor="passw">Introduzca su contraseña:</label>
                        <input type="password" id="passw" onChange={handleChangePass} required/>
                    </div>
                    <button type="submit">Eliminar mi cuenta ahora</button>
                    <p>*Esta acción no se puede revertir</p>
                </form>
            </dialog>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
        </>
    )

}


export default DeleteUserForm;