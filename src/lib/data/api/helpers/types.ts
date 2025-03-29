export interface TypedResponse<P> extends Response {
	json(): Promise<P>;
}
