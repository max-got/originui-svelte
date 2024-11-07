<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import Star from 'lucide-svelte/icons/star';
</script>

<Button>
	<Star class="-ms-1 me-2 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
	<span class="flex items-baseline gap-2">
		Star
		<span class="text-xs text-primary-foreground/60">729</span>
	</span>
</Button>
