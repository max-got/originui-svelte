<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import SelectNative from '$lib/components/ui/select-native.svelte';

	// [!code collapse-start]
	const timezones = Intl.supportedValuesOf('timeZone')
		.map((timezone) => {
			const formatter = new Intl.DateTimeFormat('en', {
				timeZone: timezone,
				timeZoneName: 'shortOffset'
			});
			const parts = formatter.formatToParts(new Date());
			const offset = parts.find((part) => part.type === 'timeZoneName')?.value || '';
			const modifiedOffset = offset === 'GMT' ? 'GMT+0' : offset;

			return {
				value: timezone,
				label: `(${modifiedOffset}) ${timezone.replace(/_/g, ' ')}`,
				numericOffset: parseInt(offset.replace('GMT', '').replace('+', '') || '0')
			};
		})
		.sort((a, b) => a.numericOffset - b.numericOffset);
	// [!code collapse-end]
</script>

<div class="space-y-2">
	<Label for="select-12">Timezone select (native)</Label>
	<SelectNative id="select-12" value="Europe/London">
		{#each timezones as { value, label } (value)}
			<option {value}>
				{label}
			</option>
		{/each}
	</SelectNative>
</div>
