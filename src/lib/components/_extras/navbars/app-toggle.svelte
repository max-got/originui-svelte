<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';

	const id = $props.id();
	let selectedValue = $state('off');
</script>

<div class="inline-flex h-8 rounded-md bg-input/50 p-0.5">
	<RadioGroup
		value={selectedValue}
		onValueChange={(value) => {
			selectedValue = value;
		}}
		class="group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-sm after:bg-background after:shadow-sm after:transition-[transform,box-shadow] after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full [&:has(:focus-visible)]:after:border-ring [&:has(:focus-visible)]:after:ring-[3px] [&:has(:focus-visible)]:after:ring-ring/50"
		data-state={selectedValue}
	>
		<label
			class="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-3 transition-colors group-data-[state=on]:text-muted-foreground/70"
		>
			Sitemap
			<RadioGroupItem id="{id}-1" value="off" class="sr-only" />
		</label>
		<label
			class="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-3 transition-colors group-data-[state=off]:text-muted-foreground/70"
		>
			Wireframe
			<RadioGroupItem id="{id}-2" value="on" class="sr-only" />
		</label>
	</RadioGroup>
</div>
