export interface ApiResponse<T> {
	status: 1 | 0;
	result: T;
	error: string | null;
}
