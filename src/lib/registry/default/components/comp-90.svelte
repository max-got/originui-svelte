<script lang="ts">
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button disabled>
	<LoaderCircle class="-ms-1 animate-spin" size={16} aria-hidden="true" />
	Button
</Button>
