<script lang="ts">
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button class="group">
	Button
	<ArrowRightIcon
		class="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
		size={16}
		aria-hidden="true"
	/>
</Button>
