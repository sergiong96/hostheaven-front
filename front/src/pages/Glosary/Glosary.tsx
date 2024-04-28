import './_Glosary.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ConceptView from './ConceptView/ConceptView';
import { getAllConcepts } from '../../services/GlosaryService';
import { useEffect, useState } from 'react';
import { Concept } from './types';



function Glosary() {

    const [concepts, setConcepts] = useState<Concept[]>([]);
    const [seeConcept, setSeeConcept] = useState<Concept | null>(null);

    useEffect(() => {
        getAllConcepts().then((res: Response) => {
            return res.json();
        }).then((data: Concept[]) => {
            setConcepts(data);
        })
    }, []);



    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const selectedConcept = concepts.find(concept => concept.id_concept === parseInt(event.currentTarget.id))
        if (selectedConcept) {
            setSeeConcept(selectedConcept);
        }

    }


    return (
        <>
            <Header />

            <main id="glosary-page">
                <h3>El hosting puede resultar complejo. Deja que te ayudemos</h3>
                <aside id="concept-names-container">
                    <ul>
                        {concepts.map((concept) => (
                            <li key={concept.id_concept} id={concept.id_concept.toString()} onClick={handleClick}>{concept.concept_name}</li>
                        ))
                        }
                    </ul>
                </aside>
                <section id="description-containers">
                    <ConceptView concept={seeConcept} />
                </section>
            </main>

            <Footer />

        </>

    );
};

export default Glosary;