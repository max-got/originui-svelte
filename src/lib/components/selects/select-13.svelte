<script lang="ts">
	import SelectNative from '$lib/components/ui/select-native.svelte';
</script>

<div class="group relative">
	<label
		for="select-13"
		class="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[select:disabled]:opacity-50"
	>
		Select with overlapping label (native)
	</label>
	<SelectNative id="select-13">
		<option value="" disabled selected> Select framework </option>
		<option value="s1">Svelte</option>
		<option value="s2">Next.js</option>
		<option value="s3">Astro</option>
		<option value="s4">Gatsby</option>
	</SelectNative>
</div>
