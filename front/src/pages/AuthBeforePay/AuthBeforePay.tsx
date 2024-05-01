import { useEffect, useState } from "react";
import { useLocation, NavigateFunction, useNavigate } from "react-router-dom";

function AuthBeforePay() {
    //Pagina donde se le da la opcion para iniciar sesion o registrarse.
    //-Si le da a iniciar sesion se abre un dialog para iniciar sesion, se crea el token, se extrae el id user y todo y se reenvia a payment 
    //con los datos del paquete (navigate("/payment", { state: { packageData: packageData } });)

    //-Si le da a registrarse se abre un dialog para registrarse, se crea el nuevo usuario y, tras esto, 
    //se inicia sesion con los datos que lleguen del servidor del usuario recien registrado y se reenvia a payment 
    //con los datos del paquete (navigate("/payment", { state: { packageData: packageData } });)
    //*Al darle a registrarse, en el servidor debo hacer un nuevo metodo para crear un nuevo usuario, extraer su id, nombre y email al crearlo
    //crear un token con esos datos y devolverlo a la vista, para guardar ese token en el localStorage e iniciar asi la sesión 
    //de forma que en payment se puedan capturar los datos del token de ese ususario recien registrado

    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const [packageData, setPackageData] = useState<any>({});


    useEffect(() => {
        setPackageData(location.state.packageData);
    }, []);




    return (
        <main id="authBeforePay-page">


        </main>
    )
}


export default AuthBeforePay;