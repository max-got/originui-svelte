import type { PageServerLoad } from './$types.js';

export const load = (async ({ params, isDataRequest }) => {
	console.log({ isDataRequest });
	return {
		id: params.id,
		isDataRequest,
	};
}) satisfies PageServerLoad;