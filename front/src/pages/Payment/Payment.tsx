import { useEffect, useState } from 'react';
import './_Payment.scss';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { createTransaction } from '../../services/TradeService';
import ServerResponse from '../../components/ServerResponse/ServerResponse';
import { ResponseData, UserData } from './types';
import Auth from './Auth/Auth';


function Payment() {

    const logo = require("../../assets/logo/logo.png");
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const [packageData, setPackageData] = useState<any>({});
    const [price1month, setPrice1month] = useState<string>("0");
    const [price12month, setPrice12month] = useState<string>("0");
    const [price24month, setPrice24month] = useState<string>("0");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
        user_id: 0,
        name: "",
        surname: "",
        email: "",
        password: "",
        payment_method: "",
        payment_reference: ""
    });
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });
    const [finalPrice, setFinalPrice] = useState<string>("0");

    useEffect(() => {
        const token: string | null = localStorage.getItem("sessionToken");

        if (token) {
            const decodedToken: any = jwtDecode(token);
            const user_id: number = parseInt(decodedToken.sub || "0");
            const email: string = decodedToken.email;
            const name: string = decodedToken.name;

            setIsLoggedIn(true);
            setUserData({
                user_id: user_id,
                name: name,
                email: email,
                surname: "",
                password: "",
                payment_method: "",
                payment_reference: ""

            });
        } else {
            setIsLoggedIn(false);
        }
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setPackageData(location.state.packageData);
        if (packageData) {
            setFinalPrice(packageData.package_price + "€");
            setPrice1month(packageData.package_price);
            setPrice12month(((packageData.package_price - (packageData.package_price * 0.15)) * 12).toFixed(2));
            setPrice24month(((packageData.package_price - (packageData.package_price * 0.20)) * 24).toFixed(2));
        }
    }, [packageData])


    const handleSubmit = () => {
        if (isLoggedIn) {
            const paymentSelected: string = (document.querySelector("#payment-method input[type=radio]:checked") as HTMLInputElement).value;
            const selectedPeriod: number = parseInt((document.querySelector("#period input[type=radio]:checked") as HTMLInputElement).value);
            const startDate: Date = new Date();
            const startDateFormat: string = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
            const endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + selectedPeriod);
            const endDateFormat: string = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
            const finalPrice: string = (document.querySelector("#period>article>div:has(input[type=radio]:checked) div input[name=final-amount]") as HTMLInputElement).value;
            let dataObject = {};

            if (packageData.custom) {
                // Para paquetes custom
                dataObject = {
                    id_user: userData.user_id,
                    package_price: finalPrice || 0,
                    date_start: startDateFormat,
                    date_end: endDateFormat,
                    payment_method: paymentSelected,
                    custom: true,
                    hosting_type: packageData.hosting_type,
                    email_account: packageData.email_account || 0,
                    storage: packageData.storage || 0,
                    monthly_bandwidth: packageData.monthly_bandwidth || 0,
                    domains: packageData.domains || 0,
                    databases: packageData.databases || 0,
                    ftp_server: true,
                    migration: packageData.migration || false,
                    purchase_quantity: "1",
                    technical_support_24h: packageData.technical_support_24h || false,
                    ssl: true,
                    cdn: true,
                    app_installation: packageData.app_installation || false,
                    state: "COMPLETADO"
                };
            } else {
                // Para paquetes estandar
                dataObject = {
                    id_package: packageData.id_package,
                    id_user: userData.user_id,
                    package_price: finalPrice || 0,
                    date_start: startDateFormat,
                    date_end: endDateFormat,
                    payment_method: paymentSelected,
                    state: "COMPLETADO"
                };
            }

            let resStatus = 0;

            handleServerResponse(resStatus, "");
            createTransaction(dataObject).then((res) => {
                resStatus = res.status;
                return res.json();
            }).then((data) => {
                handleServerResponse(resStatus, data.message);
                setTimeout(() => {
                    navigate("/userArea");
                }, 2000);
            }).catch((res: Response) => {
                resStatus = res.status;
                res.json().then((error) => {
                    handleServerResponse(resStatus, error.message);
                    setTimeout(() => {
                        navigate("/userArea");
                    }, 2000);
                })
            });
        } else {
            const authSection = document.querySelector("section#not-loged");
            authSection?.scrollIntoView();
            alert("Inicie sesión o regístrese antes de continuar");
        }
    }

    const onLoginIn = () => {
        const token: string | null = localStorage.getItem("sessionToken");

        if (token) {
            setIsLoggedIn(true);
            const decodedToken: any = jwtDecode(token);
            const user_id: number = parseInt(decodedToken.sub || "0");
            const email: string = decodedToken.email;
            const name: string = decodedToken.name;
            setUserData({
                user_id: user_id,
                name: name,
                email: email,
                surname: "",
                password: "",
                payment_method: "",
                payment_reference: ""

            });
        }
    }

    const selectRadio = (event: React.MouseEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement;
        if (element.nodeName === "INPUT") {
            element.checked = true;
        } else {
            const radioInput = element.querySelector("input[type=radio]") as HTMLInputElement;
            if (radioInput) {
                radioInput.checked = true;
            }
        }

        const finalPrice = ((element.nextElementSibling as HTMLElement).querySelector("input[name=final-amount]") as HTMLInputElement).value;
        const finalPriceSummary = document.querySelector("#summary #package-data #final-price input[type=text]") as HTMLInputElement;
        if (finalPriceSummary) {
            setFinalPrice(finalPrice + "€");
        }
    }

    let cont = 1;
    const setSectionNumber: any = () => {
        let sections = document.querySelectorAll("main>section").length;
        let section_number = (sections - sections) + cont;
        if (section_number <= sections) {
            cont++;
            return section_number;
        }
    }

    const handleServerResponse = (status: number, message: string) => {
        setResponseData({
            status: status,
            response: message
        });
    }

    const redirectHome = () => {
        navigate("/");
    }

    return (
        <>
            <main id="payment-page">
                <img src={logo} alt="Logo" title='Ir a Home' onClick={redirectHome} />
                <section id="period">
                    <p>{setSectionNumber()}. Elige un período</p>
                    <article>
                        <div id="1month">
                            <div onClick={selectRadio}>
                                <input type="radio" name="time-period" defaultValue="1" defaultChecked />
                                <p>1 mes</p>
                            </div>
                            <div>
                                <p>Total:</p>
                                <input type="text" name="final-amount" readOnly value={price1month || "0"} />
                                <p>€</p>
                            </div>
                            <p>{packageData.package_price}€ al mes</p>
                        </div>

                        <div id="12month">
                            <div onClick={selectRadio}>
                                <input type="radio" name="time-period" defaultValue="12" />
                                <p>12 meses</p>
                            </div>
                            <div>
                                <p>Total:</p>
                                <input type="text" name="final-amount" readOnly value={price12month || "0"} />
                                <p>€</p>
                            </div>
                            <p>{(packageData.package_price - (packageData.package_price * 0.15)).toFixed(2)}€ al mes</p>
                        </div>

                        <div id="24month">
                            <div onClick={selectRadio}>
                                <input type="radio" name="time-period" defaultValue="24" />
                                <p>24 meses</p>
                            </div>
                            <div>
                                <p>Total:</p>
                                <input type="text" name="final-amount" readOnly value={price24month || "0"} />
                                <p>€</p>
                            </div>
                            <p>{(packageData.package_price - (packageData.package_price * 0.20)).toFixed(2)}€ al mes</p>
                        </div>
                    </article>

                </section>

                {!isLoggedIn && <Auth sectionNumber={setSectionNumber()} updateLoginStatus={onLoginIn} />}

                <section id="payment-method">
                    <p>{setSectionNumber()}. Elige un método de pago</p>

                    <article>
                        <div>
                            <label htmlFor="credit">Tarjeta de crédito</label>
                            <input type="radio" name="payment_method" id="credit" value="TARJETA_CREDITO" defaultChecked />
                        </div>
                        <div>
                            <label htmlFor="debit">Tarjeta de débito</label>
                            <input type="radio" name="payment_method" id="debit" value="TARJETA_DEBITO" />
                        </div>
                        <div>
                            <label htmlFor="transfer">Transferencia</label>
                            <input type="radio" name="payment_method" id="transfer" value="TRANSFERENCIA" />
                        </div>
                        <div>
                            <label htmlFor="paypal">Paypal</label>
                            <input type="radio" name="payment_method" id="paypal" value="PAYPAL" />
                        </div>
                        <div>
                            <label htmlFor="wallet">Wallet</label>
                            <input type="radio" name="payment_method" id="wallet" value="WALLET" />
                        </div>
                    </article>
                    <article>
                        <input type="text" placeholder='Nombre del titular' />
                        <input type="text" placeholder='Número de tarjeta' />
                        <div>
                            <input type="date" placeholder='Fecha de vencimiento' />
                            <input type="number" placeholder='Código de seguridad' />
                        </div>
                    </article>
                </section>
                <section id="summary">
                    <p>{setSectionNumber()}. Resumen del pedido</p>

                    <article id="user-data">
                        <div>
                            <label htmlFor="username">Nombre usuario</label>
                            <input type="text" readOnly defaultValue={userData.name || ""} id="username" />
                        </div>
                        <div>
                            <label htmlFor="useremail">Correo electrónico</label>
                            <input type="email" readOnly defaultValue={userData.email || ""} id="useremail" />
                        </div>
                    </article>

                    <article id="package-data">
                        <ul>
                            <li>Tipo de hosting: <span>{packageData.hosting_type}</span></li>
                            <li><span>{packageData.storage || 0}GB</span> de almacenamiento</li>
                            <li><span>{packageData.monthly_bandwidth || 0}GB</span> de ancho de banda</li>
                            <li><span>{packageData.domains || 0}</span> dominios</li>
                            <li><span>{packageData.databases || 0}</span> bases de datos</li>
                            <li>¿CDN? <span>{packageData.cdn ? "Sí" : "No"}</span></li>
                            <li>¿Soporte 24h? <span>{packageData.technical_support_24h ? "Sí" : "No"}</span></li>
                        </ul>
                        <div id="final-price">
                            <label htmlFor="">Precio Final:  </label>
                            <input type="text" readOnly value={finalPrice} />
                        </div>
                    </article>
                </section>
                <form action="#" id="main-form">
                    <button type="button" onClick={handleSubmit}>Contratar servicio</button>
                </form>
            </main>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}
        </>
    );
};

export default Payment;