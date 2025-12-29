<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button class="rounded-full" variant="outline" size="icon" aria-label="Add new item">
	<Plus size={16} aria-hidden="true" />
</Button>
