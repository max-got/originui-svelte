import type { UsersAPIResponseJSON } from './users.handlers';

import { createRequestClient } from '../helpers/RequestClient';
import { API_V1_USERS_ROUTE } from './users.routes';

export const fetchUsers = async () => {
	const response =
		await createRequestClient().requestJSON<UsersAPIResponseJSON>(API_V1_USERS_ROUTE);
	return response;
};
