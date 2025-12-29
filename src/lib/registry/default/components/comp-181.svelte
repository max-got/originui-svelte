<script lang="ts">
	import IconMoon from '@lucide/svelte/icons/moon';
	import IconSun from '@lucide/svelte/icons/sun';

	import Label from '$lib/registry/default/ui/label.svelte';
	import Switch from '$lib/registry/default/ui/switch.svelte';

	let checked = $state(true);

	const uid = $props.id();
</script>

<div class="inline-flex items-center gap-2">
	<Switch id={uid} bind:checked aria-label="Toggle switch" />
	<Label for={uid}>
		<span class="sr-only">Toggle switch</span>
		{#if checked}
			<IconSun size={16} aria-hidden="true" />
		{:else}
			<IconMoon size={16} aria-hidden="true" />
		{/if}
	</Label>
</div>
