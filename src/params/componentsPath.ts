import type { ParamMatcher } from '@sveltejs/kit';

import { COMPONENT_ROUTES } from '$lib/config/routes';

export const match = ((
	param: string
): param is (typeof COMPONENT_ROUTES)[keyof typeof COMPONENT_ROUTES]['path'] => {
	return Object.values(COMPONENT_ROUTES).some((route) => route.path === param);
}) satisfies ParamMatcher;
