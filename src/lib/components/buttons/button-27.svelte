<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import Volume from 'lucide-svelte/icons/volume';
	import Volume1 from 'lucide-svelte/icons/volume-1';
	import Volume2 from 'lucide-svelte/icons/volume-2';
	import VolumeX from 'lucide-svelte/icons/volume-x';

	let volume = $state(3);

	function decreaseVolume() {
		volume = Math.max(0, volume - 1);
	}

	function increaseVolume() {
		volume = Math.min(6, volume + 1);
	}

	// Reactive volume icon selection
	const VolumeIcon = $derived(
		volume === 0 ? VolumeX : volume < 3 ? Volume : volume < 5 ? Volume1 : Volume2
	);
</script>

<div class="inline-flex items-center" role="group" aria-labelledby="volume-control">
	<span id="volume-control" class="sr-only"> Volume Control </span>
	<Button
		class="rounded-full"
		variant="outline"
		size="icon"
		aria-label="Decrease volume"
		onclick={decreaseVolume}
		disabled={volume === 0}
	>
		<Minus size={16} stroke-width={2} aria-hidden="true" />
		<span class="sr-only">Decrease</span>
	</Button>
	<div class="flex items-center px-3 text-sm font-medium tabular-nums" aria-live="polite">
		<VolumeIcon class="opacity-60" size={16} stroke-width={2} aria-hidden="true" />

		<span class="ms-2" aria-label={`Current volume is ${volume}`}>
			{volume}
		</span>
	</div>
	<Button
		class="rounded-full"
		variant="outline"
		size="icon"
		aria-label="Increase volume"
		onclick={increaseVolume}
		disabled={volume === 6}
	>
		<Plus size={16} stroke-width={2} aria-hidden="true" />
		<span class="sr-only">Increase</span>
	</Button>
</div>
