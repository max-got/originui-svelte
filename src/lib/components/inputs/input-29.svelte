<script module lang="ts">
	// [!code collapse-start]
	/**
	 * IMPORTANT: This component was built for demo purposes only and has not been tested in production.
	 * It serves as a proof of concept for a currency input.
	 * If you're interested in collaborating to create a more robust, production-ready
	 * headless component, your contributions are welcome!
	 */
	import { tick } from 'svelte';

	export class CurrencyInput {
		#isInitialLoad = $state(true);
		#value = $state(0);
		#displayValue = $derived.by(() => this.#formatCurrency(this.#value));

		#setValue: (val: string) => void;

		constructor(initialValue: number = 0, setValue?: (val: string) => void) {
			this.#value = initialValue;
			this.#setValue = setValue ?? (() => {});

			this.#setValue(this.#formatCurrency(initialValue));
			this.#isInitialLoad = false;

			$effect(() => {
				if (!this.#isInitialLoad) {
					this.#setValue(this.#formatCurrency(this.#value));
				}
			});
		}

		decrement = () => {
			this.#value--;
		};

		increment = () => {
			this.#value++;
		};

		#formatCurrency(amount: number): string {
			return new Intl.NumberFormat('de-DE', {
				currency: 'EUR',
				currencySign: 'accounting',
				maximumFractionDigits: 2,
				minimumFractionDigits: 2,
				style: 'currency'
			}).format(amount);
		}

		#handleBlur = (event: FocusEvent & { currentTarget: HTMLInputElement }) => {
			const value = this.#parseLocaleNumber(event.currentTarget.value);
			if (!Number.isNaN(value)) {
				this.#value = value;
			}
		};

		#handleFocus = (event: FocusEvent & { currentTarget: HTMLInputElement }) => {
			const input = event.currentTarget;
			const numericValue = input.value.replace('.', ',');
			input.value = numericValue;

			tick().then(() => {
				input.setSelectionRange(numericValue.length, numericValue.length);
			});
		};

		#handleInput = (event: Event & { currentTarget: HTMLInputElement }) => {
			const input = event.currentTarget;
			const cleanedInput = input.value.replace(/[^\d,]/g, '');
			const cursorPosition = input.selectionStart;

			this.#updateValue(cleanedInput);

			tick().then(() => {
				input.value = this.displayValue;
				const newCursorPosition = Math.min(cursorPosition ?? 0, input.value.length);
				input.setSelectionRange(newCursorPosition, newCursorPosition);
			});
		};

		#handleKeyDown = (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
			switch (event.key) {
				case 'ArrowDown':
					this.decrement();
					break;
				case 'ArrowUp':
					this.increment();
					break;
				case 'Enter':
					event.currentTarget.blur();
					break;
			}
		};

		#parseLocaleNumber(stringNumber: string): number {
			const decimalSeparator = ',';
			const thousandSeparator = '.';
			return Number.parseFloat(
				stringNumber.replace(thousandSeparator, '').replace(decimalSeparator, '.')
			);
		}

		#updateValue(value: string) {
			const [integerPart, fractionalPart = ''] = value.split(',');
			const limitedFractionalPart = fractionalPart.slice(0, 2);
			const limitedValue = `${integerPart},${limitedFractionalPart}`;
			const parsedValue = this.#parseLocaleNumber(limitedValue);

			if (!Number.isNaN(parsedValue)) {
				this.#value = parsedValue;
			}
		}

		get displayValue() {
			return this.#displayValue;
		}

		get value() {
			return this.#value;
		}

		set value(val: number) {
			this.#value = val;
		}

		inputProps = $derived.by(
			() =>
				({
					'aria-roledescription': 'Currency input',
					autocomplete: 'off',
					autocorrect: 'off',
					id: 'input-29',
					inputmode: 'numeric',
					onblur: this.#handleBlur,
					onfocus: this.#handleFocus,
					oninput: this.#handleInput,
					onkeydown: this.#handleKeyDown,
					spellcheck: false,
					type: 'text',
					value: this.displayValue
				}) as const
		);

		decrementProps = $derived.by(() => ({
			'aria-controls': this.inputProps.id,
			'aria-label': 'Decrease value',
			'aria-labelledby': this.inputProps.id,
			id: 'decrement',
			onclick: this.decrement,
			tabindex: -1
		}));

		incrementProps = $derived.by(() => ({
			'aria-controls': this.inputProps.id,
			'aria-label': 'Increase value',
			'aria-labelledby': this.inputProps.id,
			id: 'increment',
			onclick: this.increment,
			tabindex: -1
		}));
	}
	// [!code collapse-end]
</script>

<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';

	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';

	const currencyInput = new CurrencyInput(99);
</script>

<div class="space-y-2">
	<Label for="input-29" class="text-sm font-medium text-foreground">
		Number input with chevrons
	</Label>
	<div
		class="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-2"
	>
		<input
			class="flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none"
			{...currencyInput.inputProps}
		/>
		<div class="flex h-[calc(100%+2px)] flex-col">
			<button
				class="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				{...currencyInput.incrementProps}
			>
				<ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
			</button>
			<button
				class="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				{...currencyInput.decrementProps}
			>
				<ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
			</button>
		</div>
	</div>
</div>
