import type { RequestClient } from '$data/api/helpers/RequestClient';

import 'unplugin-icons/types/svelte';

// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
	type Picture = import('vite-imagetools').Picture;
	declare module '*&enhanced' {
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
