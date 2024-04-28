export const createTransaction = (formData: any): Promise<Response> => {

    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "trades/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            resolve(response);
        });
    });
}