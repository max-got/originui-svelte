<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Switch from '$lib/components/ui/switch.svelte';

	import IconMoon from 'lucide-svelte/icons/moon';
	import IconSun from 'lucide-svelte/icons/sun';

	let checked = $state(true);
</script>

<div class="inline-flex items-center gap-2">
	<Switch id="switch-10" bind:checked aria-label="Toggle switch" />
	<Label for="switch-10">
		<span class="sr-only">Toggle switch</span>
		{#if checked}
			<IconSun size={16} stroke-width={2} aria-hidden="true" />
		{:else}
			<IconMoon size={16} stroke-width={2} aria-hidden="true" />
		{/if}
	</Label>
</div>
