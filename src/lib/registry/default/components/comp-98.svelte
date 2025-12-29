<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';

	import Button from '$lib/registry/default/ui/button.svelte';

	let open = $state(false);
</script>

<Button
	class="group rounded-full"
	variant="outline"
	size="icon"
	onclick={() => (open = !open)}
	aria-expanded={open}
	aria-label={open ? 'Close menu' : 'Open menu'}
>
	<Plus
		class="transition-transform duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-135"
		size={16}
		aria-hidden="true"
	/>
</Button>
