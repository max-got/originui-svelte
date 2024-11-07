import type { PageServerLoad } from './$types.js';

import { fetchComponentsFromAPI } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ parent }) => {
	// const { componentMetadata } = await parent();

	// return {
	// 	componentMetadatas: componentMetadata
	// };
}) satisfies PageServerLoad;
