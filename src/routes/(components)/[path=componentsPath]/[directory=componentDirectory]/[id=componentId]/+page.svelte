<script lang="ts">
	import type { PageData } from './$types';

	import * as Preview from '$lib/demo/preview-component/index.svelte.js';

	let { data }: { data: PageData } = $props();

	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title
		>{data.componentMetadata.id}.svelte | {data.componentMetadata.directory} | Component | Origin UI
		- Svelte</title
	>
	<meta
		name="description"
		content="Overview of the {data.componentMetadata.id}.svelte component from the {data
			.componentMetadata.directory} directory."
	/>
	<meta
		name="keywords"
		content="svelte, component, {data.componentMetadata.id}, {data.componentMetadata
			.directory}, origin ui, tailwindcss, ui, library"
	/>
	<meta
		name="twitter:title"
		content="{data.componentMetadata.id}.svelte | {data.componentMetadata
			.directory} | Component | Origin UI - Svelte"
	/>
	<meta
		name="twitter:description"
		content="Overview of the {data.componentMetadata.id}.svelte component from the {data
			.componentMetadata.directory} directory."
	/>

	<meta
		property="og:title"
		content="{data.componentMetadata.id}.svelte | {data.componentMetadata
			.directory} | Component | Origin UI - Svelte"
	/>
	<meta
		property="og:description"
		content="Overview of the {data.componentMetadata.id}.svelte component from the {data
			.componentMetadata.directory} directory."
	/>
</svelte:head>

<Preview.Component
	componentMetadata={data.componentMetadata}
	nextComponentMetadata={data.nextComponentMetadata}
	prevComponentMetadata={data.prevComponentMetadata}
	isPreview={false}
/>
