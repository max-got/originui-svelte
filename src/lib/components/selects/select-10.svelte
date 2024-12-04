<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import SelectNative from '$lib/components/ui/select-native.svelte';
</script>

<div class="space-y-2">
	<Label for="select-10">Select with auto-width (native)</Label>
	<div class="w-fit">
		<SelectNative id="select-10">
			<option value="s1">Svelte</option>
			<option value="s2">Next.js</option>
			<option value="s3">Astro</option>
			<option value="s4">Gatsby</option>
		</SelectNative>
	</div>
</div>
