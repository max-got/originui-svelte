<script lang="ts">
	import type { AvailableOUIComponent } from '$data/api/components/components.handler.js';
	import type { ComponentProps } from 'svelte';

	import { getComponentDialogCtx } from '$lib/demo/component-preview/component-dialog-context.svelte.js';
	import ComponentUnavailable from '$lib/demo/component-unavailable.svelte';
	import Component from '$lib/demo/component.svelte';
	import ComponentCard from '$lib/demo/new/component-card.svelte';
	import PageGrid from '$lib/demo/new/page-grid.svelte';
	import PageHeader from '$lib/demo/page-header.svelte';

	let { data } = $props();

	const componentDialogCtx = getComponentDialogCtx();
	async function showComponentModal({ component }: { component: AvailableOUIComponent }) {
		componentDialogCtx.setComponent(component);
	}
</script>

{#if data.components && data.components.length > 0}
	<PageGrid>
		{#each data.components as { Component, ...rest } (rest.name)}
			<ComponentCard component={rest}>
				{rest.name}
				<Component />
			</ComponentCard>
		{/each}
	</PageGrid>
{/if}

<!-- <PageHeader id="title" title={data.pageHeader.title}>
	{data.pageHeader.description}
</PageHeader> -->

<svelte:head>
	<!-- <title>{data.SEO.title}</title>
	<meta name="description" content={data.SEO.description} />
	<meta property="og:title" content={data.SEO.title} />
	<meta property="og:description" content={data.SEO.description} />
	<meta name="twitter:title" content={data.SEO.title} />
	<meta name="twitter:description" content={data.SEO.description} /> -->
</svelte:head>

<PageGrid>
	<div></div>
	<!-- {#each data.componentsData.components as { Component: RenderedComponent, ...rest } (rest.id)}
		<ComponentCard
			meta={componentLayoutMeta}
			data-component-id={rest.id}
			data-component-directory={rest.directory}
			data-component-availability={rest.availability}
		>
			{#if rest.availability === 'todo'}
				<ComponentUnavailable />
			{:else if rest.availability === 'available'}
				<Component
					componentData={rest}
					onShallowRouteClick={() => {
						if (!RenderedComponent) return;
						showComponentModal({ component: { ...rest, Component: RenderedComponent } });
					}}
				>
					<RenderedComponent />
				</Component>
			{/if}
		</ComponentCard>
	{/each} -->
</PageGrid>
