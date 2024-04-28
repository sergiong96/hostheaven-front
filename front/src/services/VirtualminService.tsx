
const fetchEndpoints = async (): Promise<string[]> => {
    const URL: any = process.env.REACT_APP_URL_NGROK;
    const API_KEY: any = process.env.REACT_APP_API_KEY_NGROK;
    const HEADERS = {
        "Authorization": `Bearer ${API_KEY}`,
        "Ngrok-Version": "2"
    }

    const response = await fetch(URL, {
        headers: HEADERS
    });

    // Insertar condicion para que solo guarde links operativos
    // Los inserto en un array porque, a veces, devuelve varios endpoints (aunque solo funcione uno de ellos)
    let endpoints_array: string[] = [];
    if (response.ok) {
        const data = await response.json();

        for (let endpoint of data['endpoints']) {
            let new_endpoint = {
                "id_endpoint": endpoint['id'],
                "created_at": endpoint['created_at'],
                "public_url": endpoint['public_url']
            }

            if (!endpoints_array.includes(JSON.stringify(new_endpoint))) {
                endpoints_array.push(JSON.stringify(new_endpoint));
            }
        }
    }

    return endpoints_array;
}

export default fetchEndpoints;
