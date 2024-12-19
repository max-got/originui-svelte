<script lang="ts">
	import type { AvailableOUIComponent } from '$data/api/components.handler.js';

	import * as DemoComponents from '$lib/demo/demo-component/index.js';
	import PageHeader from '$lib/demo/page-header.svelte';
	import { getPreviewComponentDialogCtx } from '$lib/demo/preview-component/index.svelte.js';
	import { createPreviousAccessedStorage } from '$lib/demo/utils/previous-accessed-storage.svelte.js';

	import { pushState } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	const previewComponentDialogCtx = getPreviewComponentDialogCtx();
	async function showComponentModal(
		e: MouseEvent,
		componentUrl: string,
		component: AvailableOUIComponent
	) {
		if (e.shiftKey || e.metaKey || e.ctrlKey) return;
		e.preventDefault();

		//no need for data in pushState, bc we already have the data in the page
		pushState(componentUrl, {});
		previewComponentDialogCtx.openDialog(component);
	}

	const componentCategories = $derived.by(() => {
		return data.componentsCategories.map((category) => category.components);
	});

	const componentMetadataLocalStorage = createPreviousAccessedStorage({
		value: {
			[data.routeMetadata.path]: {
				completed: data.completed,
				todo: data.todo,
				total: data.total
			}
		}
	});

	function updateLocalStorage() {
		componentMetadataLocalStorage.updateComponents({
			[data.routeMetadata.path]: {
				completed: data.completed,
				todo: data.todo,
				total: data.total
			}
		});
	}

	$effect(() => {
		if (!componentMetadataLocalStorage.isMismatch) return;

		const { completed, todo, total } = data;
		const storedTotal =
			componentMetadataLocalStorage.getCurrentComponents()[data.routeMetadata.path]?.total ?? 0;
		const newComponentCount = total - storedTotal;

		if (newComponentCount <= 0) return;

		toast.info(`${newComponentCount} new components added to ${data.routeMetadata.header.title}!`, {
			description: `Now featuring ${completed} completed components${
				todo > 0 ? ` with ${todo} more coming soon!` : '.'
			}`,
			duration: 10000,
			onAutoClose: updateLocalStorage,
			onDismiss: updateLocalStorage
		});
	});
</script>

<PageHeader id="title" title={data.routeMetadata.header.title}>
	{data.routeMetadata.header.description}
</PageHeader>

<svelte:head>
	<title>{data.routeMetadata.seo.title} | Svelte Components | Origin UI - Svelte</title>
	<meta name="description" content={data.routeMetadata.seo.description} />

	<meta
		property="og:title"
		content="{data.routeMetadata.seo.title} | Svelte Components  | Origin UI - Svelte"
	/>
	<meta property="og:description" content={data.routeMetadata.seo.description} />

	<meta
		name="twitter:title"
		content="{data.routeMetadata.seo.twitterTitle} | Svelte Components  | Origin UI - Svelte"
	/>
	<meta name="twitter:description" content={data.routeMetadata.seo.twitterDescription} />
</svelte:head>

<div class="components-wrapper">
	<DemoComponents.Wrapper
		{componentCategories}
		data-path={data.routeMetadata.path}
		class="wrapper data-[path=accordions]:lg:grid-cols-2 data-[path=alerts-notifications-banners]:lg:grid-cols-2"
		data-directory={data.routeMetadata.componentDirectory.join('_')}
	>
		{#snippet availableComponent({ data })}
			<DemoComponents.Demo
				class="demo"
				data-component={data.id}
				data-directory={data.directory}
				componentData={data}
				onShallowRouteClick={(e, { componentUrl, data }) =>
					showComponentModal(e, componentUrl, data)}
			/>
		{/snippet}
		{#snippet comingSoonComponent({ data })}
			<DemoComponents.DemoComingSoon componentData={data} />
		{/snippet}
		{#snippet unavailableComponent()}
			<DemoComponents.DemoUnavailable />
		{/snippet}
	</DemoComponents.Wrapper>
</div>

<div>
	<style>
		.components-wrapper {
			.wrapper {
				&[data-path='buttons'],
				&[data-path='tabs'] {
					text-align: center;
				}
			}
			.demo {
				&[data-directory='banners'] {
					grid-column: 1 / -1;
				}

				&[data-directory='tooltips'],
				&[data-directory='switches'],
				&[data-directory='notifications'],
				&[data-directory='alerts'],
				&[data-directory='hover-cards'],
				&[data-directory='badges'],
				&[data-directory='avatars'],
				&[data-directory='dropdowns'],
				&[data-directory='popovers'] {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				&[data-directory='dialogs'] {
					text-align: center;
				}

				&[data-component='notification-23'] {
					grid-column: 1 / -1;
					display: block;
				}
			}
		}
	</style>
</div>
