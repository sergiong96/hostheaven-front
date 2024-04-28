import './_HostingPackagesHome.scss';
import { useState, useEffect } from 'react';
import { getAllStandardPackages } from '../../../services/HostingPackageService';
import { useNavigate, Link, NavigateFunction } from "react-router-dom";
import { PackageData, HostingPackage } from '../types';



function HostingPackagesHome() {
    const [hostingPackages, setHostingPackages] = useState<HostingPackage[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        getAllStandardPackages().then((res: Response) => {
            return res.json();
        }).then((data) => {
            setHostingPackages(data);
        });
    }, []);


    useEffect(() => {
        const token = localStorage.getItem("sessionToken");

        if (token) {
            setIsLoggedIn(true);
        }
    }, [])


    const handlePaymentClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        if (!isLoggedIn) {
            alert("Necesita autenticarse antes de contratar cualquier servicio");
        } else {
            const packageData = getPackageData(event.currentTarget);
            console.log(packageData)
            navigate("/payment", { state: { packageData: packageData } });
        }
    }

    const getPackageData = (button: HTMLButtonElement) => {
        const div: HTMLDivElement | null = button.closest(".package");
        let list: NodeListOf<HTMLLIElement> | null = null;
        let price: HTMLDivElement | null = null;
        const packageData: PackageData = {
            id_package: -1,
            storage: 0,
            domains: 0,
            hosting_type: 'COMPARTIDO',
            monthly_bandwidth: 0,
            databases: 0,
            cdn: false,
            ssl: false,
            technical_support_24h: false,
            package_price: 0
        };

        if (div) {
            list = div.querySelectorAll("ul.characteristics > li");
            price = div.querySelector("div.price");

            packageData.id_package = parseInt(div.id);

            if (list) {
                list.forEach((element) => {
                    let name = element.dataset.name;
                    let value = element.dataset.value;
                    if (name && value) {
                        if (name === "cdn" || name === "ssl" || name === "technical_support_24h") {
                            packageData[name] = value === "true";
                        } else if (name === "hosting_type") {
                            packageData[name] = value;
                        } else if (name === "databases" || name === "domains" || name === "monthly_bandwidth" || name === "storage") {
                            packageData[name] = parseInt(value);
                        }
                    }

                });
            }

            if (price) {
                packageData.package_price = parseFloat(price.dataset.value || "0.0");
            }


        }


        return packageData;
    }



    return (
        <section id="home-packages-container">
            <h2>Contrata ya el plan que mejor se adapte a tus necesidades</h2>
            <article>
                {hostingPackages.map((data) => (
                    <div key={data.id_package} id={data.id_package.toString()} className={"package " + data.package_name}>
                        <div className="package-header">
                            <h3 className='name'>{data.package_name}</h3>
                        </div>

                        <hr />


                        <div className="package-body">
                            <ul className='characteristics'>
                                <li data-name="storage" data-value={data.storage}><strong>Almacenamiento</strong>: {data.storage}GB</li>
                                <li data-name="domains" data-value={data.domains}><strong>Dominios:</strong> {data.domains}</li>
                                <li data-name="type" data-value={data.hosting_type}><strong>Tipo de hosting:</strong> {data.hosting_type}</li>
                                <li data-name="monthly_bandwidth" data-value={data.monthly_bandwidth}><strong>Ancho de banda:</strong> {data.monthly_bandwidth + "GB"}</li>
                                <li data-name="databases" data-value={data.databases}><strong>Bases de datos:</strong> {data.databases}</li>
                                <li data-name="cdn" data-value={data.cdn ? 'true' : 'false'}><strong>CDN:</strong> {data.cdn ? <i className="fa-solid fa-check" style={{ color: 'springgreen' }}></i> : <i className="fa-solid fa-xmark" style={{ color: 'red' }}></i>}</li>
                                <li data-name="ssl" data-value={data.ssl ? 'true' : 'false'}><strong>SSL:</strong> {data.ssl ? <i className="fa-solid fa-check" style={{ color: 'springgreen' }}></i> : <i className="fa-solid fa-xmark" style={{ color: 'red' }}></i>}</li>
                                <li data-name="support" data-value={data.technical_support_24h ? 'true' : 'false'}><strong>Soporte técnico 24 horas:</strong> {data.technical_support_24h ? <i className="fa-solid fa-check" style={{ color: 'springgreen' }}></i> : <i className="fa-solid fa-xmark" style={{ color: 'red' }}></i>}</li>
                            </ul>
                            <div className='price' data-name="price" data-value={data.package_price}>
                                <p><strong>Precio:</strong></p>
                                <input type="text" name="price" value={data.package_price} readOnly />
                                <p>€/mes</p>
                            </div>
                        </div>

                        <hr />
                        <div className='btn-to-cart'>
                            <button type="button" id={data.id_package.toString()} onClick={handlePaymentClick}>¡Lo quiero!</button>
                        </div>
                    </div>
                ))}

            </article>
            <article className='btn-to-cart-custom'>
                <p>O pulsa sobre el botón y configura tu propio plan personalizado <i className="fa-regular fa-circle-right"></i></p>
                <button type="button"><Link to="/hostingPlans#custom-creator-container">Lo quiero a mi manera <i className="fa-solid fa-champagne-glasses"></i></Link></button>
            </article>


        </section>
    )
}

export default HostingPackagesHome;