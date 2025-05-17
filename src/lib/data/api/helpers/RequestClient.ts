import type { TypedResponse } from './types';

export class RequestClient {
	constructor(readonly fetch: typeof globalThis.fetch = globalThis.fetch) {}

	async request<P>(url: string): Promise<TypedResponse<P>> {
		const response = await this.fetch(url);
		return response as TypedResponse<P>;
	}

	async requestJSON<P>(url: string): Promise<P> {
		const response = await this.request<P>(url);
		return response.json();
	}
}

export const createRequestClient = (fetch: typeof globalThis.fetch = globalThis.fetch) => {
	return new RequestClient(fetch);
};
