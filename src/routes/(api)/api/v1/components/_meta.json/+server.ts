import type { RequestHandler } from './$types';

import { API_V1_COMPONENTS_META_ENDPOINT_HANDLER } from '$lib/data/api/components/_meta/_meta.handler';

export const GET: RequestHandler = API_V1_COMPONENTS_META_ENDPOINT_HANDLER.GET;
