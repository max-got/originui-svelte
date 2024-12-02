<script lang="ts">
	import type { AvailableOUIComponent } from '$lib/utils/handleComponentSource';

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
</script>

<PageHeader title={data.routeMetadata.header.title}>
	{data.routeMetadata.header.description}
</PageHeader>

<DemoComponents.Wrapper
	componentCategories={[data.components]}
	data-path={data.routeMetadata.path}
	class="data-[path=buttons]:text-center"
>
	{#snippet availableComponent({ availableComponentData })}
		<DemoComponents.Demo
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
