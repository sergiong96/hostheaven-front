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