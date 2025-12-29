<script lang="ts">
	import Trash from '@lucide/svelte/icons/trash';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button variant="destructive">
	<Trash class="-ms-1 opacity-60" size={16} aria-hidden="true" />
	Button
</Button>
