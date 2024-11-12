import Card from './card.svelte';

import { Resvg } from '@resvg/resvg-js';
import { read } from '$app/server';
import InterRegularTTF from '$lib/assets/og/fonts/Inter-Regular.ttf';
import satori, { type SatoriOptions } from 'satori';
import { html as toReactNode } from 'satori-html';
import { render } from 'svelte/server';

const height = 630;
const width = 1200;

const fontData = read(InterRegularTTF).arrayBuffer();

const options: SatoriOptions = {
	fonts: [{ data: await fontData, name: 'Inter' }],
	height,
	width
};

export const GET = async ({ setHeaders, url, fetch }) => {
	const title = url.searchParams.get('title') ?? undefined;
	const author = url.searchParams.get('author') ?? undefined;
	const website = url.searchParams.get('website') ?? undefined;
	const img = url.searchParams.get('img') ?? undefined;
	const { body } = render(Card, {
		props: {
			author,
			img,
			title,
			website
		}
	});

	const markup = toReactNode(body);
	const svg = await satori(markup, options);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: +width
		}
	});

	const image = resvg.render();
	setHeaders({
		'cache-control': 'public, max-age=31536000',
		'content-type': 'image/png'
	});

	return new Response(image.asPng());
};
