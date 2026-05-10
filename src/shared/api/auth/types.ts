export interface IBaseResponse {
    success: boolean;
    reason?: string;
}

export interface IUserDto {
    _id: string;
    phone: string;
    firstname?: string;
    middlename?: string;
    lastname?: string;
    email?: string;
    city?: string;
}

export interface IOtpRequest {
    phone: string;
}
export interface IOtpResponse extends IBaseResponse {
    retryDelay: number;
}

export interface ISignInRequest {
    phone: string;
    code: number;
}

export interface ISignInResponse extends IBaseResponse {
    user: IUserDto;
    token: string;
}

export interface IGetUserSessionResponse extends IBaseResponse {
    user: IUserDto;
}
