import type { RequestHandler as MetaRequestHandler } from '../../../../../routes/(api)/api/v1/components/_meta.json/$types';

import { getComponentRegistry } from '$lib/componentRegistry';

import type { TypedResponse } from '../../helpers/types';

export const API_V1_COMPONENTS_META_ENDPOINT_HANDLER = {
	GET: (async () => {
		const instance = await getComponentRegistry();
		const files = instance.getRegistryMetaData();

		return Response.json(files) as TypedResponse<typeof files>;
	}) satisfies MetaRequestHandler
};

export type ComponentMetaAPIResponseJSON = Awaited<
	ReturnType<Awaited<ReturnType<typeof API_V1_COMPONENTS_META_ENDPOINT_HANDLER.GET>>['json']>
>;
