export interface ResponseData {
    status: number;
    response: string;
}

export interface UserData {
    user_id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    payment_method: string;
    payment_reference: string | null
}