import './_privacy.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Privacy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();

    const logo = require("../../assets/logo/logo.png");

    const redirectHome = () => {
        navigate("/");
    }


    return (
        <main id="privacy-policy">
            <img src={logo} alt="Logo" onClick={redirectHome} />
            <h2>Titular y Responsable del tratamiento de los Datos</h2>
            <h3>Clases de Datos recogidos</h3>
            <p>La información completa referente a cada categoría de Datos Personales que se recogen se proporciona en las secciones de la presente política de privacidad dedicadas a tal fin o mediante textos explicativos específicos que se muestran antes de la recogida de dichos Datos.
                Los Datos Personales podrán ser proporcionados libremente por el Usuario o, en caso de los Datos de Uso, serán recogidos automáticamente cuando se utilice esta Aplicación.
                Salvo que se indique lo contrario, todos los Datos solicitados por esta Aplicación son obligatorios y la negativa a proporcionarlos podrá imposibilitar que esta Aplicación pueda proceder a la prestación de sus servicios. En los casos en los que esta Aplicación indique específicamente que ciertos Datos no son obligatorios, los Usuarios serán libres de no comunicar tales Datos sin que esto tenga consecuencia alguna sobre la disponibilidad o el funcionamiento del Servicio.
                Los Usuarios que tengan dudas sobre qué Datos son obligatorios pueden contactar con el Titular.
                El uso de Cookies - o de otras herramientas de seguimiento - por parte de esta Aplicación o por los titulares de servicios de terceros utilizados por esta Aplicación tiene como finalidad la prestación del Servicio solicitado por el Usuario, además de cualesquiera otras finalidades que se describan en el presente documento y en la Política de Cookies.
                El Usuario asume la responsabilidad respecto de los Datos Personales de terceros que se obtengan, publiquen o compartan a través de esta Aplicación.</p>

            <h3>Modalidad y lugar del tratamiento de los Datos recogidos</h3>
            <h4>Modalidades de Tratamiento</h4>
            <p>El Titular tratará los Datos de los Usuarios de manera adecuada y adoptará las medidas de seguridad apropiadas para impedir el acceso, la revelación, alteración o destrucción no autorizados de los Datos.
                El tratamiento de Datos se realizará mediante ordenadores y/o herramientas informáticas, siguiendo procedimientos y modalidades organizativas estrictamente relacionadas con las finalidades señaladas. Además del Titular, en algunos casos podrán acceder a los Datos ciertas categorías de personas autorizadas, relacionadas con el funcionamiento de esta Aplicación (administración, ventas, marketing, departamento jurídico y de administración de sistemas) o contratistas externos que presten servicios al Titular (tales como proveedores externos de servicios técnicos, empresas de mensajería, empresas de hosting, empresas de informática, agencias de comunicación) que serán nombrados por el Titular como Encargados del Tratamiento, si fuera necesario. Se podrá solicitar al Titular en cualquier momento una lista actualizada de dichas personas.</p>
            <h4>Lugar</h4>
            <p>Los Datos se tratan en las oficinas del Titular, así como en cualquier otro lugar en el que se encuentren situadas las partes implicadas en dicho proceso de tratamiento.
                Dependiendo de la localización de los Usuarios, las transferencias de Datos pueden implicar la transferencia de los Datos de los Usuarios a otro país diferente al suyo propio. Para más información sobre el lugar de tratamiento de dichos Datos transferidos, los Usuarios podrán consultar la sección que contiene los detalles sobre el tratamiento de los Datos Personales.</p>
            <h4>Período de conservación</h4>
            <p> Salvo que se indique lo contrario en el presente documento, los Datos Personales serán tratados y conservados durante el tiempo necesario y para la finalidad por la que han sido recogidos y podrán conservarse durante más tiempo debido a una obligación legal pertinente o sobre la base del consentimiento de los Usuarios.
                Esta Aplicación utiliza Rastreadores. Para obtener más información, los Usuarios pueden consultar la Política de Cookies.</p>

            <h3>Más información para los usuarios</h3>
            <h4>Base jurídica del Tratamiento</h4>
            <p> El Titular podrá tratar los Datos Personales del Usuario, si se cumple una de las siguientes condiciones:
                Cuando los Usuarios hayan dado su consentimiento para una o más finalidades específicas.
                Cuando la obtención de Datos sea necesaria para el cumplimiento de un contrato con el Usuario y/o cualquier otra obligación precontractual del mismo;
                Cuando el tratamiento sea necesario para el cumplimiento de una obligación legal de obligado cumplimiento por parte del Usuario;
                Cuando el tratamiento esté relacionado con una tarea ejecutada en interés público o en el ejercicio de competencias oficiales otorgadas al Titular;
                Cuando el tratamiento sea necesario con el fin de un interés legítimo perseguido por el Titular o un tercero.
                En cualquier caso, el Titular está a su disposición para definir las bases jurídicas específicas que se aplican al tratamiento y en particular, si la obtención de los Datos Personales es un requisito contractual o estatutario o un requisito necesario para formalizar un contrato.</p>
            <h4>Más información sobre el tiempo de retención</h4>
            <p> Salvo que se indique lo contrario en el presente documento, los Datos Personales serán tratados y conservados durante el tiempo necesario y para la finalidad por la que han sido recogidos y podrán conservarse durante más tiempo debido a una obligación legal pertinente o sobre la base del consentimiento de los Usuarios.
                Por lo tanto:
                Los Datos Personales recogidos para la formalización de un contrato entre el Titular y el Usuario deberán conservarse como tales hasta en tanto dicho contrato se haya formalizado por completo.
                Los Datos Personales recogidos en legítimo interés del Titular deberán conservarse durante el tiempo necesario para cumplir con dicha finalidad. Los Usuarios pueden encontrar información específica relacionada con el interés legítimo del Titular consultando las secciones relevantes del presente documento o contactando con el Titular.
                El Titular podrá conservar los Datos Personales durante un periodo adicional cuando el Usuario preste su consentimiento a tal tratamiento, siempre que dicho consentimiento siga vigente. Además, el Titular podrá estar obligado a conservar Datos Personales durante un periodo adicional siempre que se precise para el cumplimiento de una obligación legal o por orden que proceda de la autoridad.
                Una vez terminado el período de conservación, los Datos Personales deberán eliminarse. Por lo tanto, los derechos de acceso, supresión, rectificación y de portabilidad de datos no podrán ejercerse una vez haya expirado dicho periodo de conservación.</p>
            <h4>Los derechos de los Usuarios basados en el Reglamento General de Protección de datos (RGPD)</h4>
            <p>Los Usuarios podrán ejercer ciertos derechos con respecto al tratamiento de Datos por parte del Titular.
                En particular, los Usuarios tienen derecho a hacer lo siguiente, en la medida en que lo permita la ley:
                Retirar su consentimiento en cualquier momento. Los Usuarios tienen derecho a retirar su consentimiento cuando lo hubieran concedido con anterioridad para el tratamiento de sus Datos Personales.
                Objeción al tratamiento de sus Datos. Los Usuarios tienen derecho a oponerse al tratamiento de sus Datos si dicho tratamiento se lleva a cabo con arreglo a una base jurídica distinta del consentimiento.
                Acceso a sus Datos. Los Usuarios tienen derecho a conocer si sus Datos serán tratados por el Titular, a obtener información sobre ciertos aspectos del tratamiento, además de obtener una copia de los Datos objeto del tratamiento.
                Verificar y solicitar la modificación. Los Usuarios tienen derecho a verificar la exactitud de sus Datos y solicitar que los mismos se actualicen o corrijan.
                Limitar el tratamiento de sus Datos. Los Usuarios tienen derecho a limitar el tratamiento de sus Datos. En ese supuesto, el Titular solo tratará sus Datos con la finalidad de almacenarlos.
                Borrar o eliminar los Datos Personales. Los Usuarios tienen derecho a obtener la supresión de sus Datos por parte del Titular.
                Recibir sus Datos y transferirlos a otro responsable. Los Usuarios tienen derecho a recibir sus Datos en un formato estructurado, de uso común y lectura mecánica y, si fuera técnicamente posible, a que se transmitan los mismos a otro responsable sin ningún impedimento.
                Poner una reclamación. Los Usuarios tienen derecho a poner una reclamación ante la autoridad competente en materia de protección de datos de carácter personal.
                Los Usuarios también tendrán derecho a conocer las bases legales de las transferencias de Datos al extranjero, incluido a cualquier organización internacional que se rija por el Derecho Internacional Público o que esté formada por dos o más países, como la ONU, y a conocer las medidas de seguridad tomadas por el Titular para salvaguardar sus Datos.</p>
            <h4>Detalles sobre el derecho de oposición al tratamiento</h4>
            <p>Cuando el tratamiento de los Datos Personales sea de interés público, en el ejercicio de competencias oficiales otorgadas al Titular o con motivo de un interés legítimo del Titular, los Usuarios podrán oponerse a dicho tratamiento explicando un motivo con relación a su situación particular para justificar su objeción.
                Los Usuarios deben saber, sin embargo, que en caso de que sus Datos Personales sean tratados con fines de marketing directo, pueden oponerse en cualquier momento a tal tratamiento, de forma gratuita y sin necesidad de justificación. Cuanto el Usuario se oponga al tratamiento para fines de marketing directo, los Datos Personales no podrán continuar siendo tratados para tales fines. Para saber si los Datos Personales de los Usuarios están siendo tratados por el Titular para fines de marketing directo, los Usuarios deberán consultar las secciones relevantes del presente documento.
            </p>
            <h4>Cómo ejercer estos derechos</h4>
            <p>Cualquier solicitud para ejercer los derechos del Usuario puede dirigirse al Titular a través de los datos de contacto facilitados en el presente documento. Dichas solicitudes son gratuitas y el Titular responderá a ellas tan pronto como le sea posible y siempre dentro del plazo de un mes, proporcionando a los Usuarios la información exigida por la ley. El Titular comunicará cualquier rectificación o supresión de Datos Personales o limitación del tratamiento a cada destinatario, en su caso, al que se le hayan comunicado los Datos Personales, salvo que sea imposible o exija un esfuerzo desproporcionado. A solicitud de los Usuarios, el Titular les informará sobre dichos destinatarios.</p>

            <h3>Información adicional sobre la recogida de Datos y su tratamiento</h3>
            <h4>Defensa jurídica</h4>
            <p>Los Datos Personales del Usuario podrán ser utilizados para la defensa jurídica del Titular ante un tribunal o en las fases judiciales previas a un posible pleito derivado del uso inapropiado de esta Aplicación o de los Servicios relacionados.
                El Usuario declara conocer que el Titular puede ser requerido por las autoridades públicas a fin de revelar Datos Personales.</p>
            <h4>Información adicional acerca de los Datos Personales del Usuario</h4>
            <p>Además de las informaciones contenidas en esta política de privacidad, esta Aplicación podrá proporcionar al Usuario información adicional y contextual relativa a Servicios específicos o a la recogida y tratamiento de los Datos Personales.</p>
            <h4>Log del sistema y mantenimiento</h4>
            <p>Por motivos relativos al funcionamiento y mantenimiento, esta Aplicación y cualquier otro servicio, proporcionado por terceros, que se utilice, podrá recoger un registro del sistema; es decir, archivos que registren la interacción con esta Aplicación y que puedan contener Datos Personales, tales como la dirección IP del Usuario.</p>
            <h4>Información no contenida en esta política de privacidad</h4>
            <p>Se podrá solicitar en cualquier momento información adicional sobre la recogida y el tratamiento de los Datos Personales al Titular. La información de contacto se indica al inicio del presente documento.</p>
            <h4>Modificación de la presente política de privacidad</h4>
            <p>El Titular se reserva el derecho de modificar esta política de privacidad en cualquier momento, notificándolo a los Usuarios a través de esta página y, a ser posible, a través de esta Aplicación y/o de ser técnica y legalmente posible notificando directamente a los Usuarios, en caso de que el Titular cuente con la información de contacto necesaria a tal fin. Se recomienda encarecidamente que revisen esta página con frecuencia, tomando como referencia la fecha de la última actualización indicada al final de la página.
                En el caso de que los cambios afectasen a las actividades de tratamiento realizadas en base al consentimiento del Usuario, el Titular deberá obtener, si fuera necesario, el nuevo consentimiento del Usuario.</p>
        </main>
    )
}


export default Privacy;