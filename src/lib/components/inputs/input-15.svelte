<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<div class="space-y-2">
	<Label for="input-15">Input with end add-on</Label>
	<div class="flex rounded-lg shadow-sm shadow-black/[.04]">
		<Input
			id="input-15"
			class="-me-px rounded-e-none shadow-none"
			placeholder="google"
			type="text"
		/>
		<span
			class="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground"
		>
			.com
		</span>
	</div>
</div>
