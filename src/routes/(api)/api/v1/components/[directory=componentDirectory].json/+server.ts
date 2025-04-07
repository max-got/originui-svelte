import { API_V1_COMPONENTS_ENDPOINT_HANDLER } from '$data/api/components/components.handler';

export const prerender = true;

export const entries = API_V1_COMPONENTS_ENDPOINT_HANDLER.entries;
export const GET = API_V1_COMPONENTS_ENDPOINT_HANDLER.GET;
export const fallback = API_V1_COMPONENTS_ENDPOINT_HANDLER.fallback;
