<script lang="ts">
	import * as DemoComponents from '$lib/demo/demo-component/index.js';
	import PageHeader from '$lib/demo/page-header.svelte';

	let { data } = $props();

	const totalCheckboxes = data.checkboxComponents.length;
	const totalRadios = data.radioComponents.length;
	const totalSwitches = data.switchComponents.length;
	const totalComponents = totalCheckboxes + totalRadios + totalSwitches;
</script>

<main>
	<div class="px-4 sm:px-6">
		<div class="mx-auto w-full max-w-6xl">
			<PageHeader title="Checkbox, Radio, and Switch">
				A growing collection of over {totalComponents} components built with
				<span class="text-svelte">Svelte</span> and TailwindCSS.
			</PageHeader>

			<DemoComponents.Wrapper class="[&>[data-preview-code]]:px-1.5 [&>[data-preview-code]]:py-2">
				{#each data.checkboxComponents as component (component.id)}
					<DemoComponents.Demo {component} />
				{/each}
				{#each data.radioComponents as component (component.id)}
					<DemoComponents.Demo {component} />
				{/each}
				{#each data.switchComponents as component (component.id)}
					<DemoComponents.Demo class="flex justify-center" {component} />
				{/each}
			</DemoComponents.Wrapper>
		</div>
	</div>
</main>
