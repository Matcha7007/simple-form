export interface UserForSignup {
    userName: string;
    email?: string;
    password: string;
    phone?: number;
    userRole?: number
}

export interface UserForSignin {
    userName?: any;
    password?: any;
    token?: any;
    userRole?: any;
}