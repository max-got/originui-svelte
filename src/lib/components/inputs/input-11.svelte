<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<div class="space-y-2">
	<Label for="input-11">Input with start inline add-on</Label>
	<div class="relative">
		<Input id="input-11" class="peer ps-16" placeholder="google.com" type="text" />
		<span
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
		>
			https://
		</span>
	</div>
</div>
