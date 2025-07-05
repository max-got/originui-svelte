<script lang="ts">
	import Button from '$lib/registry/default/ui/button.svelte';

	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
</script>

<Button class="group">
	Button
	<ArrowRightIcon
		class="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
		size={16}
		aria-hidden="true"
	/>
</Button>
