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
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const maxLength = 50;
	const characterLimit = new CharacterLimit(maxLength);
</script>

<div class="space-y-2">
	<Label for="input-34">Input with character limit</Label>
	<div class="relative">
		<Input
			id="input-34"
			class="peer pe-14"
			type="text"
			bind:value={characterLimit.value}
			maxlength={characterLimit.maxLength}
			aria-describedby="character-count"
		/>
		<div
			id="character-count"
			class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
			aria-live="polite"
			role="status"
		>
			{characterLimit.characterCount}/{characterLimit.maxLength}
		</div>
	</div>
</div>
