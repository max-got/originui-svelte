<script lang="ts">
	import { useCharacterLimit } from '$lib/registry/default/hooks/use-character-limit.svelte';
	import Input from '$lib/registry/default/ui/input.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const maxLength = 50;
	const characterLimit = useCharacterLimit(maxLength);
	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Input with character limit</Label>
	<div class="relative">
		<Input
			id={uid}
			class="peer pe-14"
			type="text"
			bind:value={characterLimit.value}
			maxlength={characterLimit.maxLength}
			aria-describedby={uid}
		/>
		<div
			class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums peer-disabled:opacity-50"
			aria-live="polite"
			role="status"
		>
			{characterLimit.characterCount}/{characterLimit.maxLength}
		</div>
	</div>
</div>
