<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Mail from 'lucide-svelte/icons/mail';
</script>

<Button class="group" variant="secondary">
	<Mail class="-ms-1 me-2 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
	Button
	<ArrowRight
		class="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
</Button>
