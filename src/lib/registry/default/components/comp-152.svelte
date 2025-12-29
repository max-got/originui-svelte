<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';
	import Label from '$lib/registry/default/ui/label.svelte';
</script>

<RadioGroup value="r1">
	<div class="flex items-center gap-2">
		<RadioGroupItem value="r1" id="radio-01-r1" />
		<Label for="radio-01-r1">Option 1</Label>
	</div>
	<div class="flex items-center gap-2">
		<RadioGroupItem value="r2" id="radio-01-r2" />
		<Label for="radio-01-r2">Option 2</Label>
	</div>
	<div class="flex items-center gap-2">
		<RadioGroupItem value="r3" id="radio-01-r3" />
		<Label for="radio-01-r3">Option 3</Label>
	</div>
</RadioGroup>
