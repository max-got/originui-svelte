<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<div class="space-y-2">
	<Label for="input-13">Input with inline add-ons</Label>
	<div class="relative">
		<Input id="input-13" class="peer pe-12 ps-6" placeholder="0.00" type="text" />
		<span
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
		>
			€
		</span>
		<span
			class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50"
		>
			EUR
		</span>
	</div>
</div>
