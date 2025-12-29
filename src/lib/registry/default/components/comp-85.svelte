<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button variant="outline">
	<ArrowLeft
		class="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
		size={16}
		aria-hidden="true"
	/>
	Button
</Button>
