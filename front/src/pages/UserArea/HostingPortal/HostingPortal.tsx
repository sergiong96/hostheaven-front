import './_hostingPortal.scss';
import { useState } from "react";
import fetchEndpoints from '../../../services/VirtualminService';

function HostingPortal() {

    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [links, setLink] = useState<any[]>([]);


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


    return (
        <article id="hosting-portal">
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

    )
}


export default HostingPortal;