import './_auth.scss';
import { logIn } from '../../../services/UserService';
import { useState } from 'react';
import { signInAndLogin } from '../../../services/UserService';
import { ResponseData } from '../types';
import ServerResponse from '../../../components/ServerResponse/ServerResponse';

function Auth({ sectionNumber, updateLoginStatus }: { sectionNumber: number, updateLoginStatus: Function }) {

    const [loginResponse, setLoginResponse] = useState("");
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });

    const openLoginModal = () => {
        const dialog = document.querySelector("dialog#log-in") as HTMLDialogElement;
        if (dialog) {
            document.body.classList.add("overflow");
            dialog.showModal();
        }
    }

    const closeLoginModal = () => {
        const dialog = document.querySelector("dialog#log-in") as HTMLDialogElement;
        if (dialog) {
            document.body.classList.remove("overflow");
            dialog.close();
        }
    }

    const handleSignIn = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const formObjet: any = {};

        formData.forEach((value, key) => {
            formObjet[key] = value
        });

        let resStatus = 0;

        handleServerResponse(resStatus, "");
        signInAndLogin(formObjet).then((res: Response) => {
            resStatus = res.status;
            return res.json();
        }).then((data) => {
            const token: string | null | undefined = data.token;
            if (token) {
                setResponseData({
                    status: resStatus,
                    response: data.message
                });
                localStorage.setItem("sessionToken", token);
                setTimeout(() => {
                    updateLoginStatus();
                }, 2000);
            }
        }).catch((res: Response) => {
            resStatus = res.status;
            res.json().then((error) => {
                handleServerResponse(resStatus, error.message);
            });
        });
    }

    const handleLogIn = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const formObjet: any = {};

        formData.forEach((value, key) => {
            formObjet[key] = value
        });

        const formJSON = JSON.stringify(formObjet);

        logIn(formJSON).then((res) => {
            return res.json();
        }).then((data) => {
            const token = data.token;
            if (token) {
                localStorage.setItem("sessionToken", token);
                setLoginResponse("Iniciando sesión...");

                setTimeout(() => {
                    closeLoginModal();
                    updateLoginStatus();
                }, 2000);
            } else {
                setLoginResponse("Credenciales incorrectas");
            }
        });
    }

    const handleServerResponse = (status: number, message: string) => {
        setResponseData({
            status: status,
            response: message
        });
    }

    return (
        <section id="not-loged">
            <p>{sectionNumber}. Crea tu cuenta</p>
            <article>
                <p>¿Ya tienes una cuenta? <button type="button" onClick={openLoginModal}>Inicia sesión</button></p>
                <form method="POST" onSubmit={handleSignIn} id="sigin-form">
                    <div>
                        <div className='form-group'>
                            <label htmlFor="nomb">Nombre</label>
                            <input type="text" id="nomb" name="name" placeholder=' ' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="ape">Apellidos</label>
                            <input type="text" id="ape" name="surname" placeholder=' ' required />
                        </div>
                    </div>

                    <div>
                        <div className='form-group'>
                            <label htmlFor="mail">Correo electrónico</label>
                            <input type="email" id="mail" name="email" placeholder=' ' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="pas">Contraseña</label>
                            <input type="password" id="pas" name="password" placeholder=' ' required />
                        </div>
                    </div>
                    <button type="submit">Crear cuenta</button>
                </form>
            </article>

            <dialog id="log-in">
                <button type="button" onClick={closeLoginModal}>X</button>
                <form method="POST" onSubmit={handleLogIn} id="login-form">
                    <div className='form-group'>
                        <label htmlFor="mails">Email</label>
                        <input type="text" id="mails" name="email" placeholder=' ' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" id="pass" name="password" placeholder=' ' />
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
                {loginResponse && <p>{loginResponse}</p>}
            </dialog>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
        </section>
    )
}


export default Auth;