import './_HostingPlans.scss';
import Standard from './Standard/Standard';
import Custom from './Custom/Custom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function HostingPlans() {

    const imgUrl = require("../../assets/images/header/plans-header.jpg");
    
    return (
        <>
            <Header imagePath={imgUrl} />
            <main id="hostingPlans-page">
                <Standard />
                <Custom />
            </main>
            <Footer />
        </>
    );
};

export default HostingPlans;