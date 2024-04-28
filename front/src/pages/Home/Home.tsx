import './_Home.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HostingPackagesHome from './HostingPackagesHome/HostingPackagesHome';
import ContactHome from './ContactHome/ContactHome';
import ReviewsHome from './ReviewsHome/ReviewsHome';

function Home() {
    return (
        <>
            <Header />
            <main id="home-page">
                <HostingPackagesHome/>
                <ContactHome/>
                <ReviewsHome/>
            </main>

            <Footer />
        </>
    );
};

export default Home;