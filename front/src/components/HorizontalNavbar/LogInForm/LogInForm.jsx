import { useEffect, useState } from 'react';
import './_LogInForm.scss';
import { logIn } from '../../../services/UserService';
import { useNavigate } from 'react-router-dom';


function LogInForm({ onClose }) {

    const [loginResponse, setLoginResponse] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        showDialog();
    }, [])


    const closeDialog = () => {
        const dialog = document.querySelector("dialog#logIn-dialog");
        dialog.close();
        onClose();
    }

    const showDialog = () => {
        const dialog = document.querySelector("dialog#logIn-dialog");
        dialog.showModal();
    }

    const getFormObject = (form) => {
        const formData = new FormData(form);
        const formObjet = {};

        formData.forEach((value, key) => {
            formObjet[key] = value
        });

        return formObjet;
    }


    const handleLogIn = (event) => {
        event.preventDefault();
        const formObject = getFormObject(event.target);
        const formJSON = JSON.stringify(formObject);


        logIn(formJSON).then((res) => {
            return res.json();
        }).then((data) => {
            const token = data.token;
            if (token) {
                localStorage.setItem("sessionToken", token);
                setLoginResponse("Iniciando sesión...");

                setTimeout(() => {
                    navigate("/userArea")
                }, 2000);


            } else {
                setLoginResponse("Credenciales incorrectas");
            }
        });
    }




    return (
        <dialog id="logIn-dialog">
            <button type="button" id="close-dialog" onClick={closeDialog}>X</button>
            <form method="POST" onSubmit={handleLogIn} id="logIn-form">
                <div>
                    <label htmlFor="mail">Correo electrónico</label>
                    <input type="email" id="mail" name="email" />
                </div>
                <div>
                    <label htmlFor="passw">Contraseña</label>
                    <input type="password" id="passw" name="password" />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            {loginResponse && <p>{loginResponse}</p>}
        </dialog>
    )
}


export default LogInForm;