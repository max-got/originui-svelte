<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import Trash from 'lucide-svelte/icons/trash';
</script>

<Button variant="destructive">
	<Trash class="as -ms-1 me-2  opacity-60" size={16} stroke-width={2} aria-hidden="true" />
	Button
</Button>
