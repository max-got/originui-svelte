import type { AvailableComponent } from '$lib/types/components.ts';

import 'unplugin-icons/types/svelte';
// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			componentPreview?: {
				metadata: AvailableComponent;
			};
		}
		// interface Platform {}
	}
}

export {};
