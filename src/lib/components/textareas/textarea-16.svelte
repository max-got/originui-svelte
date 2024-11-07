<script module lang="ts">
	// [!code collapse-start]
	/**
	 * IMPORTANT: This component was built for demo purposes only and has not been tested in production.
	 * It serves as a proof of concept for a character limit input.
	 * If you're interested in collaborating to create a more robust, production-ready
	 * headless component, your contributions are welcome!
	 */
	export class CharacterLimit {
		#value = $state('');

		characterCount = $derived(this.#value.length);
		maxLength: number;

		constructor(maxLength: number) {
			this.maxLength = maxLength;
		}

		set value(value: string) {
			this.#value = value.slice(0, this.maxLength);
		}

		get value() {
			return this.#value;
		}
	}
	// [!code collapse-end]
</script>

<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Textarea from '$lib/components/ui/textarea.svelte';

	const maxLength = 180;
	const characterLimit = new CharacterLimit(maxLength);
</script>

<div class="space-y-2">
	<Label for="textarea-16">Textarea with characters left</Label>
	<Textarea
		id="textarea-16"
		bind:value={characterLimit.value}
		maxlength={characterLimit.maxLength}
		aria-describedby="characters-left-textarea"
	/>
	<p
		id="characters-left-textarea"
		class="mt-2 text-right text-xs text-muted-foreground"
		role="status"
		aria-live="polite"
	>
		<span class="tabular-nums">{characterLimit.maxLength - characterLimit.characterCount}</span>
		characters left
	</p>
</div>
