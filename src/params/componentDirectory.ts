import type { ParamMatcher } from '@sveltejs/kit';

import { categories } from '$lib/components';

export const match = ((param: string): param is (typeof categories)[number]['slug'] => {
	return categories
		.filter((category) => category.available !== 'none')
		.some((category) => category.slug === param);
}) satisfies ParamMatcher;
