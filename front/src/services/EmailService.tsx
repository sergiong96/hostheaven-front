export const sendEmail = (emailData: any): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "email/send", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        }).then((response) => {
            resolve(response);
        })
    })
}

export const getTickets = (user_id: number): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + `email/getTickets/${user_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                resolve(response);
            }
        }).catch((error) => {
            reject(error)
        })
    });
}