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

export interface IOtpResponse extends IBaseResponse {
	retryDelay: number;
}

export interface ISignInResponse extends IBaseResponse {
	user: IUserDto;
	token: string;
}

export interface IGetUserSession extends IBaseResponse {
	user: IUserDto;
}