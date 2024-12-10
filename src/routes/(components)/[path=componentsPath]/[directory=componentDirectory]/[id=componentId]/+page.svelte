<script lang="ts">
	import type { PageData } from './$types';

	import * as Preview from '$lib/demo/preview-component/index.svelte.js';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title
		>{data.component.id}.svelte | {data.component.directory} | Component | Origin UI - Svelte</title
	>
	<meta
		name="description"
		content="Overview of the {data.component.id}.svelte component from the {data.component
			.directory} directory."
	/>
	<meta
		name="keywords"
		content="svelte, component, {data.component.id}, {data.component
			.directory}, origin ui, tailwindcss, ui, library"
	/>
	<meta
		name="twitter:title"
		content="{data.component.id}.svelte | {data.component
			.directory} | Component | Origin UI - Svelte"
	/>
	<meta
		name="twitter:description"
		content="Overview of the {data.component.id}.svelte component from the {data.component
			.directory} directory."
	/>

	<meta
		property="og:title"
		content="{data.component.id}.svelte | {data.component
			.directory} | Component | Origin UI - Svelte"
	/>
	<meta
		property="og:description"
		content="Overview of the {data.component.id}.svelte component from the {data.component
			.directory} directory."
	/>
</svelte:head>

<Preview.Component
	componentMetadata={data.component}
	nextComponentMetadata={data.nextComponentMetadata}
	prevComponentMetadata={data.prevComponentMetadata}
	isPreview={false}
/>
