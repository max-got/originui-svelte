<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import SelectNative from '$lib/components/ui/select-native.svelte';
</script>

<div class="space-y-2">
	<Label for="select-02">Select with placeholder (native)</Label>
	<SelectNative id="select-02">
		<option value="" disabled selected> Please select a value </option>
		<option value="s1">1 to 5</option>
		<option value="s2">5 to 10</option>
		<option value="s3">More than 10</option>
	</SelectNative>
</div>
