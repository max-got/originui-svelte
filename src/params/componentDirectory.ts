import type { ParamMatcher } from '@sveltejs/kit';

import { categories } from '$lib/config';

export const match = ((param: string): param is (typeof categories)[number]['slug'] => {
	return categories.some((category) => category.slug === param);
}) satisfies ParamMatcher;
