import { RequestClient } from '$data/api/helpers/RequestClient';

import type { ComponentMetaAPIResponseJSON } from './_meta.handler';

import { API_V1_COMPONENTS_META_ROUTE } from './_meta.route';

export const getComponentMetaAPIResponseJSON = async (serverClient: RequestClient) => {
	return serverClient.requestJSON<ComponentMetaAPIResponseJSON>(API_V1_COMPONENTS_META_ROUTE);
};
