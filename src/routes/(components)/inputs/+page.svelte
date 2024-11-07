<script lang="ts">
	import * as DemoComponents from '$lib/demo/demo-component/index.js';
	import PageHeader from '$lib/demo/page-header.svelte';

	let { data } = $props();
</script>

<main>
	<div class="px-4 sm:px-6">
		<div class="mx-auto w-full max-w-6xl">
			<PageHeader title="Input">
				A growing collection of over 50 input components built with <span class="text-svelte"
					>Svelte</span
				> and TailwindCSS.
			</PageHeader>

			<DemoComponents.Wrapper class="[&>[data-preview-code]]:px-1.5 [&>[data-preview-code]]:py-2">
				{#each data.inputComponents as component (component.id)}
					<DemoComponents.Demo {component} />
				{/each}
				{#each data.textareaComponents as component (component.id)}
					<DemoComponents.Demo {component} />
				{/each}
			</DemoComponents.Wrapper>
		</div>
	</div>
</main>
