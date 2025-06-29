<script lang="ts">
	import { useCharacterLimit } from '$lib/hooks/use-character-limit.svelte';
	import Input from '$lib/registry/default/ui/input.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const maxLength = 8;
	const characterLimit = useCharacterLimit(maxLength);
	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Input with characters left</Label>
	<Input
		id={uid}
		type="text"
		bind:value={characterLimit.value}
		maxlength={characterLimit.maxLength}
		aria-describedby={uid}
	/>
	<p id={uid} class="text-muted-foreground mt-2 text-xs" role="status" aria-live="polite">
		<span class="tabular-nums">{characterLimit.maxLength - characterLimit.characterCount}</span> characters
		left
	</p>
</div>
