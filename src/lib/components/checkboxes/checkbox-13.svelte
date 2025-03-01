<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div
	class="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/[.04] has-[[data-state=checked]]:border-ring"
>
	<Checkbox
		id={uid}
		class="order-1 after:absolute after:inset-0"
		aria-describedby="{uid}-description"
	/>
	<div class="grid grow gap-2">
		<Label for={uid}>
			Label
			<span class="text-xs font-normal leading-[inherit] text-muted-foreground"> (Sublabel) </span>
		</Label>
		<p id="{uid}-description" class="text-xs text-muted-foreground">
			A short description goes here.
		</p>
	</div>
</div>
