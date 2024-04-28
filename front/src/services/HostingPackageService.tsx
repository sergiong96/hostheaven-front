
export const getAllStandardPackages = (): Promise<Response> => {
    return fetch(process.env.REACT_APP_BACKEND_DOMAIN + 'hostingpackages/standard');
}


