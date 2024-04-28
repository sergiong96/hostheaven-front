import './_HostingPlans.scss';
import Standard from './Standard/Standard';
import Custom from './Custom/Custom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function HostingPlans() {
    return (
        <>
            <Header />
            <main id="hostingPlans-page">
                <Standard />
                <Custom />
            </main>
            <Footer />
        </>
    );
};

export default HostingPlans;