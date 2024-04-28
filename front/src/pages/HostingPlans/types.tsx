export interface HostingPackage {
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
    hosting_type: 'COMPARTIDO' | 'VPS' | 'DEDICADO' | 'CLOUD' | 'WORDPRESS';
    storage: number;
    monthly_bandwidth: number;
    domains: number;
    databases: number;
    purchase_quantity: number;
    custom: boolean;
}

export interface StandardPackageData {
    id_package: number;
    storage: number;
    domains: number;
    hosting_type: string;
    monthly_bandwidth: number;
    databases: number;
    cdn: boolean;
    ssl: boolean;
    technical_support_24h: boolean;
    package_price: number;
}


export interface CustomPackageData {
    app_installation: boolean;
    monthly_bandwidth: number;
    domains: number;
    hosting_type: string;
    databases: number;
    cdn: boolean;
    ssl: boolean;
    technical_support_24h: boolean;
    package_price: number;
    email_account: number;
    ftp_server: boolean;
    migration: boolean;
    custom: boolean;
    storage: number;
}