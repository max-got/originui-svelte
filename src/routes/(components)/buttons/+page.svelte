<script lang="ts">
	import * as DemoComponents from '$lib/demo/demo-component/index.js';
	import { goto, preloadData, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from '$lib/demo/modal.svelte';
	import CodePreview from './[id]/+page.svelte';

	let { data } = $props();

	async function showComponentModal(url: string) {
		const result = await preloadData(url);

		if (result.type === 'loaded' && result.status === 200) {
			pushState(url, { __selectedComponent: result.data });
			showModal = true;
		} else {
			goto(url);
		}
	}

	let showModal = $state(false);
	const hasSelectedComponent = $derived($page.state?.__selectedComponent);
</script>

<Modal bind:showModal>
	{#if hasSelectedComponent}
		<div class="m-auto h-fit w-fit">
			<CodePreview component={$page.state?.__selectedComponent.componentMetadata} />
		</div>
	{:else}
		<p>No component selected</p>
	{/if}
</Modal>

<main>
	<div class="px-4 sm:px-6">
		<div class="mx-auto w-full max-w-6xl">
			<PageHeader title="Button">
				A growing collection of over 51 button components built with <span class="text-svelte"
					>Svelte</span
				> and TailwindCSS.
			</PageHeader>

			<DemoComponents.Wrapper
				class="[&>*]:flex [&>*]:justify-center [&>[data-preview-code]]:px-1.5 [&>[data-preview-code]]:py-2"
			>
				{#each data.components as component (component.id)}
					<DemoComponents.Demo {component} onShowCode={showComponentModal} />
				{/each}
			</DemoComponents.Wrapper>
		</div>
	</div>
</main>
<pre>{JSON.stringify($page, null, 2)}</pre>
