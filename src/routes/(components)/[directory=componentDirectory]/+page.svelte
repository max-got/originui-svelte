<script lang="ts">
	import type { AvailableOUIComponent } from '$data/api/components/components.handler.js';

	import { getComponentDialogCtx } from '$lib/demo/component-preview/component-dialog-context.svelte.js';
	import Component from '$lib/demo/component.svelte';
	import ComponentCard from '$lib/demo/new/component-card.svelte';
	import ComponentUnavailable from '$lib/demo/new/component-unavailable.svelte';
	import PageGrid from '$lib/demo/new/page-grid.svelte';
	import PageHeader from '$lib/demo/page-header.svelte';

	let { data } = $props();

	const componentDialogCtx = getComponentDialogCtx();
	async function showComponentModal({ component }: { component: AvailableOUIComponent }) {
		componentDialogCtx.setComponent(component);
	}
</script>

<svelte:head>
	<title>{data.SEO.title}</title>
	<meta name="description" content={data.SEO.description} />
	<meta property="og:title" content={data.SEO.title} />
	<meta property="og:description" content={data.SEO.description} />
	<meta name="twitter:title" content={data.SEO.title} />
	<meta name="twitter:description" content={data.SEO.description} />
</svelte:head>

<PageHeader id="title" title={data.pageHeader.title}>
	{data.pageHeader.description}
</PageHeader>

<PageGrid>
	{#each data.components as { Component, ...component } (component.name)}
		<ComponentCard {component}>
			{#if Component}
				<Component />
			{:else}
				<ComponentUnavailable />
			{/if}
		</ComponentCard>
	{/each}
</PageGrid>
