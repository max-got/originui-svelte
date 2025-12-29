<script lang="ts">
	import { useCharacterLimit } from '$lib/registry/default/hooks/use-character-limit.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
	import Textarea from '$lib/registry/default/ui/textarea.svelte';

	const maxLength = 180;
	const characterLimit = useCharacterLimit(maxLength);

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Textarea with characters left</Label>
	<Textarea
		id={uid}
		bind:value={characterLimit.value}
		maxlength={characterLimit.maxLength}
		aria-describedby="{uid}-characters-left-textarea"
	/>
	<p
		id="{uid}-characters-left-textarea"
		class="text-muted-foreground mt-2 text-right text-xs"
		role="status"
		aria-live="polite"
	>
		<span class="tabular-nums">{characterLimit.maxLength - characterLimit.characterCount}</span>
		characters left
	</p>
</div>
