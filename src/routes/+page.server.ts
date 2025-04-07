import type { PageServerLoad } from './$types';

import { getComponentMetaAPIResponseJSON } from '$data/api/components/_meta/_meta.query';

export const load = (async ({ locals }) => {
	const componentsMeta = await getComponentMetaAPIResponseJSON(locals.serverClient);
	return { componentsMeta };
}) satisfies PageServerLoad;
