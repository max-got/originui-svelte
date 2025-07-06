<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';

	import StarFill from '~icons/ri/star-fill';

	const id = $props.id();

	let hoverRating = $state('');
	let currentRating = $state('');

	function setHoverRating(value: string) {
		hoverRating = value;
	}
</script>

<fieldset class="space-y-4">
	<legend class="text-foreground text-sm leading-none font-medium"> Rate your experience </legend>
	<RadioGroup class="inline-flex gap-0" bind:value={currentRating}>
		{#each ['1', '2', '3', '4', '5'] as value (value)}
			<label
				class="group has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative cursor-pointer rounded p-0.5 outline-none has-focus-visible:ring-[3px]"
				onmouseenter={() => setHoverRating(value)}
				onmouseleave={() => setHoverRating('')}
			>
				<RadioGroupItem id="{id}-{value}" {value} class="sr-only" />
				<StarFill
					class={[
						'transition-all group-hover:scale-110',
						(hoverRating || currentRating) >= value ? 'text-amber-500' : 'text-input'
					]}
				/>
				<span class="sr-only">
					{value} star{value === '1' ? '' : 's'}
				</span>
			</label>
		{/each}
	</RadioGroup>
</fieldset>
