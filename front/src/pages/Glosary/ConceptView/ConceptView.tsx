import './_ConceptView.scss';
import { Concept } from '../types';


function ConceptView({ concept }: { concept: Concept | null }) {

    return concept && Object.keys(concept).length > 0 ? (
        <div className="concept-description">
            <h4>{concept.concept_name}</h4>
            <p>{concept.description}</p>
        </div>

    ) : (<div><p>Selecciona un concepto de la lista</p></div>)

}

export default ConceptView;