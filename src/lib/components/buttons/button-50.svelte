<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import IconChevronDown from 'lucide-svelte/icons/chevron-down';
	import IconChevronLeft from 'lucide-svelte/icons/chevron-left';
	import IconChevronRight from 'lucide-svelte/icons/chevron-right';
	import IconChevronUp from 'lucide-svelte/icons/chevron-up';
	import IconCircle from 'lucide-svelte/icons/circle';
</script>

<div class="inline-grid w-fit grid-cols-3 gap-1">
	<div></div>
	<Button variant="outline" size="icon" aria-label="Pan camera up">
		<IconChevronUp size={16} stroke-width="2" aria-hidden="true" />
	</Button>
	<div></div>
	<Button variant="outline" size="icon" aria-label="Pan camera left">
		<IconChevronLeft size={16} stroke-width="2" aria-hidden="true" />
	</Button>
	<div class="flex items-center justify-center" aria-hidden="true">
		<IconCircle class="opacity-60" size="16" stroke-width="2" />
	</div>
	<Button variant="outline" size="icon" aria-label="Pan camera right">
		<IconChevronRight size={16} stroke-width="2" aria-hidden="true" />
	</Button>
	<div></div>
	<Button variant="outline" size="icon" aria-label="Pan camera down">
		<IconChevronDown size={16} stroke-width="2" aria-hidden="true" />
	</Button>
	<div></div>
</div>
