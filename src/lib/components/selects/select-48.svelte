<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import SelectNative from '$lib/components/ui/select-native.svelte';
</script>

<div class="space-y-2">
	<Label for="select-48">Multiple select (native)</Label>
	<div class="overflow-hidden rounded-lg border border-input">
		<SelectNative id="select-48" class="rounded-none border-none" multiple value="">
			<option value="s1">React</option>
			<option value="s2">Next.js</option>
			<option value="s3">Astro</option>
			<option value="s4">Gatsby</option>
			<option value="s5">Vue</option>
			<option value="s6">Angular</option>
		</SelectNative>
	</div>
</div>
