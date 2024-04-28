
export const getAllConcepts = (): Promise<Response> => {
    return fetch(process.env.REACT_APP_BACKEND_DOMAIN + "glosary/list");
}

