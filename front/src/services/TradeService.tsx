export const createTransaction = (formData: any): Promise<Response> => {

    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "trades/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (!response.ok) {
                throw response;
            }
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}



export const updateTrade = (tradeData: any): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "trades/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tradeData)
        }).then((response) => {
            if (!response.ok) {
                throw response;
            }
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    })
}



export const deleteTrade = (id_trade: number, id_user: number): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + `trades/delete/${id_trade}/${id_user}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw response;
            }
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    })
}
