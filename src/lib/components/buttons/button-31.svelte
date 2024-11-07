<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Files from 'lucide-svelte/icons/files';
	import Film from 'lucide-svelte/icons/film';
</script>

<div class="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/[0.04] rtl:space-x-reverse">
	<Button
		class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
		variant="outline"
	>
		<Files class="-ms-1 me-2 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
		Files
	</Button>
	<Button
		class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
		variant="outline"
	>
		<Film class="-ms-1 me-2 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
		Media
	</Button>
	<Button
		class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
		variant="outline"
		size="icon"
		aria-label="Menu"
	>
		<Ellipsis size={16} stroke-width={2} aria-hidden="true" />
	</Button>
</div>
