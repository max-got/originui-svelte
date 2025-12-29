<script lang="ts">
	import Label from '$lib/registry/default/ui/label.svelte';
	import Switch from '$lib/registry/default/ui/switch.svelte';

	const uid = $props.id();
</script>

<div class="inline-flex items-center gap-2">
	<Switch
		id={uid}
		class="h-5 w-8 [&_span]:size-4 data-[state=checked]:[&_span]:translate-x-3 data-[state=checked]:[&_span]:rtl:-translate-x-3"
	/>
	<Label for={uid} class="sr-only">Small switch</Label>
</div>
