import Card from './card.svelte';

import { Resvg } from '@resvg/resvg-js';
import satori, { type SatoriOptions } from 'satori';
import { html as toReactNode } from 'satori-html';
import { render } from 'svelte/server';

const height = 630;
const width = 1200;

export const GET = async ({ fetch, setHeaders, url }) => {
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
	const fontData = await fetch('/fonts/Inter-Regular.ttf')
		.then((res) => res.arrayBuffer())
		.catch((e) => {
			console.log(e);
			throw e;
		});

	const markup = toReactNode(body);
	const svg = await satori(markup, {
		fonts: [{ data: fontData, name: 'Inter' }],
		height,
		width
	});

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
