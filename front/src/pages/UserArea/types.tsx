export interface UserData {
    id_user: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    payment_method: string;
    payment_reference: string | null;
}

export interface PasswordData {
    id_user: number;
    actual_pass: string;
    new_pass: string;
    new_pass_rep: string;
}

export interface ResponseData {
    status: number;
    response: string;
}

export interface HostingPackageTrade {
    hostingPackage: {
        id_package: number;
        package_name: string;
        package_price: number;
        ssl: boolean;
        cdn: boolean;
        technical_support_24h: boolean;
        migration: boolean;
        email_account: number;
        app_installation: boolean;
        ftp_server: boolean;
        hosting_type: string;
        storage: number;
        monthly_bandwidth: number;
        domains: number;
        databases: number;
        purchase_quantity: number;
        custom: boolean;
    }
    date_start: string;
    date_end: string;
    amount: number;
}

export interface DeleteData {
    user_id: number;
    password: string;
}

export interface DeleteUserFormProps {
    user_id: number;
    onClose: () => void;
}