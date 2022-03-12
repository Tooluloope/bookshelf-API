export interface JwtPayload {
    user: User;
}
export interface User {
    username: string;
    email?: string;
    gender?: string;
    fullname?: string;
    phoneNumber?: string;
}
