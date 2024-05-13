import { useEffect, useState } from 'react';
import './_UserArea.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getUserData, getContractedPackage } from '../../services/UserService';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { HostingPackageTrade, UserData } from './types';
import HostingSummary from './HostingSummary/HostingSummary';
import ModifyUser from './ModifyUser/ModifyUser';
import ModifyService from './ModifyService/ModifyService';
import HostingPortal from './HostingPortal/HostingPortal';
import MyTickets from './MyTickets/MyTickets';
import AdminArea from './AdminArea/AdminArea';



function UserArea() {

    const imgUrl = require("../../assets/images/header/user-header.jpg");
    const [showContent, setShowContent] = useState<string>("");
    const [userID, setUserID] = useState<number>(-1);
    const navigate: NavigateFunction = useNavigate();
    const [userData, setUserData] = useState<UserData>({
        id_user: 0,
        name: "",
        surname: "",
        email: "",
        password: "",
        payment_method: "",
        payment_reference: "",
        phone_number: ""
    });
    const [contractedPackage, setContractedPackage] = useState<HostingPackageTrade>();
    const [isAdmin, setIsAdmin]=useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("sessionToken");

        if (token) {
            const decodifiedToken: JwtPayload = jwtDecode(token);
            const id_user: number = parseInt(decodifiedToken.sub || "-1");
            setUserID(id_user);
            const tab = new URLSearchParams(window.location.search).get("tab") || "hosting-summary";
            setShowContent(tab);
        } else {
            navigate("/");
        }
    }, []);


    useEffect(() => {
        if (userID !== -1) {
            getUserData(userID).then((res: Response) => {
                return res.json()
            }).then((data) => {
                setUserData(data);
                if (data.email === "admin@admin") { 
                    setIsAdmin(true); 
                }
            });
            getContractedPackage(userID).then((res) => {
                if (res && res.ok) {
                    return res.json();
                }
            }).then((data) => {
                if (data && data.hostingPackage) {
                    setContractedPackage(data);
                }
            }).catch((error: any) => {

            })
        }
    }, [userID])


    const openTab = (tab: string) => {
        setShowContent(tab);
        navigate(`?tab=${tab}`);
    }


    return (
        <>
            <Header imagePath={imgUrl} />
            <main>
                {!isAdmin ? (
                    <>
                        <section id="tabs">
                            <ul>
                                <li id="hosting-summary-tab" className={showContent === "hosting-summary" ? "active" : ""} onClick={() => openTab("hosting-summary")}>Resumen Servicio</li>
                                <li id="modify-user-tab" className={showContent === "modify-user" ? "active" : ""} onClick={() => openTab("modify-user")}>Editar Datos</li>
                                <li id="modify-service-tab" className={showContent === "modify-service" ? "active" : ""} onClick={() => openTab("modify-service")}>Modificar Servicio</li>
                                <li id="hosting-portal-tab" className={showContent === "hosting-portal" ? "active" : ""} onClick={() => openTab("hosting-portal")}>Portal Hosting</li>
                                <li id="my-tickets-tab" className={showContent === "my-tickets" ? "active" : ""} onClick={() => openTab("my-tickets")}>Mis Tickets</li>
                            </ul>
                        </section>
                        <section id="tab-content">
                            {showContent === "hosting-summary" && <HostingSummary userData={userData} contractedPackage={contractedPackage} />}
                            {showContent === "modify-user" && <ModifyUser userData={userData} userID={userID} />}
                            {showContent === "modify-service" && <ModifyService contractedPackage={contractedPackage} userID={userID} />}
                            {showContent === "hosting-portal" && <HostingPortal contractedPackage={contractedPackage} />}
                            {showContent === "my-tickets" && <MyTickets user_id={userID} />}
                        </section>
                    </>) : (
                    <AdminArea />
                )}
            </main>
            <Footer />
        </>
    )
}


export default UserArea;