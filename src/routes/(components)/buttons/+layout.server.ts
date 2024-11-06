import type { LayoutServerLoad } from './$types.js';
import { fetchComponentsFromAPI } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ fetch, isDataRequest, isSubRequest }) => {
	console.log("LAYOUT LOADED")
  return {
		componentMetadata: await fetchComponentsFromAPI(fetch, 'buttons.json')
	};
}) satisfies LayoutServerLoad;