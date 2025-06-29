import type { PageServerLoad } from './$types';

import { getCategoriesWithDetails } from '$lib/data/registry/query';

export const load = (async ({ locals }) => {
	return { categories: getCategoriesWithDetails() };
}) satisfies PageServerLoad;
