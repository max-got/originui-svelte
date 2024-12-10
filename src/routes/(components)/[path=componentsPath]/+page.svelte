<script lang="ts">
	import type { AvailableOUIComponent } from '$lib/utils/handleComponentSource';
	import type { HTMLAttributes } from 'svelte/elements';

	import * as DemoComponents from '$lib/demo/demo-component/index.js';
	import PageHeader from '$lib/demo/page-header.svelte';
	import { getPreviewComponentDialogCtx } from '$lib/demo/preview-component/index.svelte.js';

	import { pushState } from '$app/navigation';

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

	const componentDirectoryDataAttributes = $derived.by(() => {
		return data.routeMetadata.componentDirectory.reduce(
			(acc: HTMLAttributes<HTMLDivElement>, directory) => {
				acc[`data-directory-${directory}`] = '';
				return acc;
			},
			{}
		);
	});
</script>

<PageHeader id="title" title={data.routeMetadata.header.title}>
	{data.routeMetadata.header.description}
</PageHeader>

<div class="_component-directory-wrapper">
	<DemoComponents.Wrapper
		componentCategories={[data.components]}
		data-path={data.routeMetadata.path}
		class="wrapper data-[path=buttons]:text-center data-[path=alerts-notifications-banners]:lg:grid-cols-2"
		{...componentDirectoryDataAttributes}
	>
		{#snippet availableComponent({ availableComponentData })}
			<DemoComponents.Demo
				class="demo"
				data-component={availableComponentData.id}
				data-directory={availableComponentData.directory}
				componentData={availableComponentData}
				onShallowRouteClick={(e, componentUrl) =>
					showComponentModal(e, componentUrl, availableComponentData)}
			/>
		{/snippet}
		{#snippet notDoneComponent({ componentData })}
			<DemoComponents.DemoNotDone {componentData} />
		{/snippet}
		{#snippet notAvailableComponent()}
			<DemoComponents.DemoUnavailable />
		{/snippet}
	</DemoComponents.Wrapper>
</div>

<style>
	._component-directory-wrapper {
		display: contents;
		:global {
			.demo {
				&[data-directory='banners'] {
					grid-column: 1 / -1;
				}
				&[data-directory='notifications'],
				[data-directory='alerts'] {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				&[data-component='notification-23'] {
					grid-column: 1 / -1;
					display: block;
				}
			}
		}
	}
</style>
