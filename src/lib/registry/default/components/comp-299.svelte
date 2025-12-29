<script lang="ts">
	import { toast } from 'svelte-sonner';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button
	variant="outline"
	onclick={() => {
		toast('Your request was completed!', {
			action: {
				label: 'Undo',
				onClick: () => console.info('Undo')
			},
			description: 'It was a long journey, but we made it!'
		});
	}}
>
	Show sonner
</Button>
