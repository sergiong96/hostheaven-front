import { useEffect, useState } from 'react';
import './_User.scss';
import { Link } from 'react-router-dom';
import LogInForm from '../LogInForm/LogInForm';
import { jwtDecode } from 'jwt-decode';


function User() {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showLogIn, setShowLogIn] = useState<boolean>(false);
    const [isLogedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const token: string | null = localStorage.getItem("sessionToken");
        if (token) {
            setIsLoggedIn(true);
            const decodedToken: any = jwtDecode(token);
            const userName: string = decodedToken.name;
            setUserName(userName);
        } 
    }, [])


    const handleVisibility = (): void => {
        setIsVisible(!isVisible);
    }


    const showLogInModal = (): void => {
        setShowLogIn(true);
    }

    const closeLogInModal = (): void => {
        setShowLogIn(false);
    }

    const closeSession = (): void => {
        localStorage.removeItem("sessionToken");
        window.location.reload();
    }

    return (
        <>
            <div id="user-icon" onClick={handleVisibility}>
                <i className="fa-solid fa-user"></i>
                {isVisible && !isLogedIn ? (
                    <div id='logIng-signIn-buttons'>
                        <button type="button" onClick={showLogInModal}>Inicia Sesión</button>
                        <button type="button"><Link to="/register">Regístrate</Link></button>
                    </div>
                ) : isVisible && isLogedIn ? (
                    <div id="loged-container">
                        <p>Bienvenido {userName.charAt(0).toUpperCase() + userName.slice(1)}!</p>
                        <button type="button"><Link to="/userArea"><i className="fa-solid fa-clipboard-user"></i>Área de usuario</Link></button>
                        <button type="button" onClick={closeSession}><i className="fa-solid fa-arrow-right-from-bracket"></i>Cerrar Sesión</button>
                    </div>
                ) : null}

            </div>
            {showLogIn && <LogInForm onClose={closeLogInModal} />}
        </>
    )


}

export default User;