import type { RequestClient } from '$data/api/helpers/RequestClient';

import 'unplugin-icons/types/svelte';

// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
	declare module '*&enhanced' {
		import type { Picture } from 'vite-imagetools';

		const value: Picture;
		export default value;
	}
	namespace App {
		// interface Error {}
		interface Locals {
			serverClient: RequestClient;
		}
		interface PageData {
			SEO?: {
				description: string;
				title: string;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
