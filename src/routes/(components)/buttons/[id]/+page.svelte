<script lang="ts">
	import { page } from '$app/stores';
	import { Demo } from '$lib/demo/demo-component/index.js';
	import type { ComponentMetadata, ComponentRender } from '$lib/types/components.js';
	import { createComponentRender } from '$lib/utils/handleComponentSource.js';
	import Page from '../../../+page.svelte';
	import type { PageData } from './$types.js';
	let { data, component }: { data?: PageData; component?: ComponentMetadata } = $props();
</script>

{#if data?.component}
	<!-- Site is directly accessed and component is loaded in +page.ts -->
	<Demo component={data.component} shallowCodeShow={false} />
{:else if component}
	<!-- Site is accessed via buttons/+page.svelte -->
	{#await createComponentRender(component) then componentRender}
		<Demo component={componentRender} shallowCodeShow={false} />
	{/await}
{:else}
	<p>No component found</p>
{/if}
