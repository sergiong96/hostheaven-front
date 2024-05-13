export const signIn = (formData: any): Promise<Response> => {

    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "users/signIn", {
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


export const getUserData = (user_id: number): Promise<Response> => {

    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + `users/getUser/${user_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
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


export const logIn = (credentials: any): Promise<Response> => {

    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "users/logIn", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: credentials
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


export const updateData = (userData: any): Promise<Response> => {

    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "users/updateUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
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


export const changePassword = (passwordObj: any): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "users/changePassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordObj)
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


export const deleteUser = (user_id: number, password: string): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + `users/delete/${user_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: password
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


export const getContractedPackage = (user_id: number): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + `hostingpackages/getHostingPackage/${user_id}`, {
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
        })
    });

}

export const signInAndLogin = (formData: any): Promise<Response> => {

    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "users/signInLogIn", {
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

export const getAllUsers = (): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BACKEND_DOMAIN + "users/getAllUsers", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response: Response) => {
            if (!response.ok) {
                throw response;
            }
            resolve(response);
        }).catch((error) => {
            reject(error)
        });
    });
}