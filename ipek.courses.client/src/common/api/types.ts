export interface IToken {
	access_token: string;
	expires_in: number;
	token_type: 'bearer';
}

export interface ITokenError {
	error: string;
}
