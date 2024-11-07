<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group/index.js';

	import AlignCenter from 'lucide-svelte/icons/align-center';
	import AlignJustify from 'lucide-svelte/icons/align-justify';
	import AlignLeft from 'lucide-svelte/icons/align-left';
	import AlignRight from 'lucide-svelte/icons/align-right';

	let value = $state('center');
</script>

<ToggleGroup
	class="inline-flex gap-0 -space-x-px divide-x divide-background rounded-lg shadow-sm shadow-black/[0.04] rtl:space-x-reverse"
	type="single"
	bind:value
>
	<ToggleGroupItem
		class="rounded-none bg-primary/80 text-primary-foreground shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
		aria-label="Align Left"
		value="left"
	>
		<AlignLeft size={16} stroke-width={2} aria-hidden="true" />
	</ToggleGroupItem>
	<ToggleGroupItem
		class="rounded-none bg-primary/80 text-primary-foreground shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
		aria-label="Align Center"
		value="center"
	>
		<AlignCenter size={16} stroke-width={2} aria-hidden="true" />
	</ToggleGroupItem>
	<ToggleGroupItem
		class="rounded-none bg-primary/80 text-primary-foreground shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
		aria-label="Align Right"
		value="right"
	>
		<AlignRight size={16} stroke-width={2} aria-hidden="true" />
	</ToggleGroupItem>
	<ToggleGroupItem
		class="rounded-none bg-primary/80 text-primary-foreground shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
		aria-label="Align Justify"
		value="justify"
	>
		<AlignJustify size={16} stroke-width={2} aria-hidden="true" />
	</ToggleGroupItem>
</ToggleGroup>
