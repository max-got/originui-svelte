import type {
	EntryGenerator,
	RequestHandler
} from '../../../routes/(api)/api/v1/components/[directory=componentDirectory].json/$types';

import { getComponentDirectories, getComponentFileNames } from '$lib/componentRegistry';
import { getComponentSource } from '$lib/utils/handleComponentSource';

interface TypedResponse<O> extends Response {
	json(): Promise<O>;
}

export class ComponentAPIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ComponentAPIError';
	}
}

export const API_V1_COMPONENTS_ENDPOINT_HANDLER = {
	entries: (async () => {
		return getComponentDirectories().map((directory) => ({ directory }));
	}) satisfies EntryGenerator,
	fallback: (async () => {
		return Response.json(
			{
				message:
					"Components not available (yet?). Create a new issue if you need this. Not even sure why you're here."
			},
			{ status: 404 }
		);
	}) satisfies RequestHandler,
	GET: (async ({ params, setHeaders }) => {
		const { directory } = params;

		const componentFiles = getComponentFileNames(directory);
		const components = await Promise.all(
			componentFiles.map((file) => getComponentSource(directory, file))
		);

		const meta = {
			directory,
			fileStats: {
				completed: components.filter((c) => !c.path.includes('.todo.')).length,
				todo: components.filter((c) => c.path.includes('.todo.')).length
			},
			total: components.length
		};

		setHeaders({
			'cache-control': 'public, max-age=31536000, immutable, stale-while-revalidate=86400'
		});

		return Response.json({
			components,
			meta
		}) as TypedResponse<{
			components: typeof components;
			meta: typeof meta;
		}>;
	}) satisfies RequestHandler
};
export type ComponentAPIResponseJSON = Awaited<
	ReturnType<Awaited<ReturnType<typeof API_V1_COMPONENTS_ENDPOINT_HANDLER.GET>>['json']>
>;
