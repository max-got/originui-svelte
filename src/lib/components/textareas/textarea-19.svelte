<script module lang="ts">
	// [!code collapse-start]
	/**
	 * IMPORTANT: This component was built for demo purposes only and has not been tested in production.
	 * It serves as a proof of concept for an auto-growing textarea.
	 * If you're interested in collaborating to create a more robust, production-ready
	 * headless component, your contributions are welcome!
	 */
	class AutoGrowingTextarea {
		defaultRows: number;
		element: HTMLTextAreaElement | null = null;

		events = {
			oninput: this.handleInput
		};

		maxRows?: number;

		constructor(defaultRows = 1, maxRows?: number) {
			this.defaultRows = defaultRows;
			this.maxRows = maxRows;
		}

		handleInput() {
			if (!this.element) return;

			this.element.style.height = 'auto';

			const style = window.getComputedStyle(this.element);
			const borderHeight =
				Number.parseInt(style.borderTopWidth) + Number.parseInt(style.borderBottomWidth);
			const paddingHeight =
				Number.parseInt(style.paddingTop) + Number.parseInt(style.paddingBottom);

			const lineHeight = Number.parseInt(style.lineHeight);
			const maxHeight = this.maxRows
				? lineHeight * this.maxRows + borderHeight + paddingHeight
				: Infinity;

			const newHeight = Math.min(this.element.scrollHeight + borderHeight, maxHeight);

			this.element.style.height = `${newHeight}px`;
		}
	}
	// [!code collapse-end]
</script>

<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Textarea from '$lib/components/ui/textarea.svelte';

	const autoGrowing = new AutoGrowingTextarea(1);
</script>

<div class="space-y-2">
	<Label for="textarea-19">Autogrowing textarea</Label>
	<Textarea
		id="textarea-19"
		placeholder="Leave a comment"
		bind:ref={autoGrowing.element}
		rows={autoGrowing.defaultRows}
		class="min-h-[none] resize-none"
		{...autoGrowing.events}
	/>
</div>
