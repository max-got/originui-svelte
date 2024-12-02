import type { ParamMatcher } from '@sveltejs/kit';

import { OUI_DIRECTORIES } from '$lib/componentRegistry.types';

export const match = ((
	param: string
): param is (typeof OUI_DIRECTORIES)[keyof typeof OUI_DIRECTORIES]['directory'] => {
	return Object.values(OUI_DIRECTORIES).some(({ directory }) => directory === param);
}) satisfies ParamMatcher;
