import './_Register.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import { signIn } from '../../services/UserService';
import { ResponseData } from './types';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ServerResponse from '../../components/ServerResponse/ServerResponse';

function Register() {

    const imgRegister:string = require("../../assets/images/register.jpeg");
    const navigate: NavigateFunction = useNavigate();
    const [paymentSelected, isPaymentSelected] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });


    const handlePaymentSelected = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let selectedOption = event.target.value;
        selectedOption !== "false" ? isPaymentSelected(true) : isPaymentSelected(false);
    }


    const getFormData = (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const formObject:{[key:string]:string} = {};

        formData.forEach((value, key) => {
            formObject[key] = value as string;
        });

        return formObject;
    }


    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formData = getFormData(event.target as HTMLFormElement);
        let resStatus = 0;

        setResponseData({
            status: resStatus,
            response: ""
        });
        signIn(formData).then((res) => {
            resStatus = res.status;
            return res.json();
        }).then((data)=>{
            setResponseData({
                status: resStatus,
                response: data.response
            });
            setTimeout(() => {
                navigate("/");
            }, 3000);
        })

    }

    return (
        <>
            <Header />
            <main id="register-page">
                <h1>No esperes más y aloja tus proyectos en HostHeaven</h1>
                <section id="register-img-container">
                    <img src={imgRegister} alt="Imagen Registro" />
                </section>
                <section id="register-form-container">
                    <form onSubmit={HandleSubmit}>
                        <div>
                            <div className='form-group'>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" name="name" placeholder=' ' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="surname">Apellidos</label>
                                <input type="text" id="surname" name="surname" placeholder=' ' />
                            </div>
                        </div>

                        <div>
                            <div className='form-group'>
                                <label htmlFor="mail">Email</label>
                                <input type="email" id="mail" name="email" placeholder=' ' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="pass">Contraseña</label>
                                <input type="password" id="pass" name="password" placeholder=' ' />
                            </div>
                        </div>

                        <div>
                            <div className='form-group-select'>
                                <label htmlFor="pay">Método de Pago</label>
                                <select defaultValue={'false'} id="pay" name="payment_method" onChange={handlePaymentSelected}>
                                    <option value="false">No añadir por ahora</option>
                                    <option value="TARJETA_CREDITO">Tarjeta de crédito</option>
                                    <option value="TARJETA_DEBITO">Tarjeta de débito</option>
                                    <option value="TRANSFERENCIA">Transferencia</option>
                                    <option value="PAYPAL">PayPal</option>
                                    <option value="WALLET">Wallet</option>
                                </select>
                            </div>
                            {paymentSelected &&
                                <div className='form-group'>
                                    <label htmlFor="ref">Referencia</label>
                                    <input type="text" id="ref" name="payment_reference" placeholder=' ' />
                                </div>}
                        </div>

                        <button type="submit" name="registerSubmit">Finalizar Registro</button>
                    </form>
                </section>
            </main>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}

            <Footer />
        </>
    );
};

export default Register;