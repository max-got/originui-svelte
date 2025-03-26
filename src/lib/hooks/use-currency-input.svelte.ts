import { tick } from 'svelte';

interface CurrencyInputOptions {
	id: string;
	initialValue?: number;
	setValue?: (val: string) => void;
	locale?: string;
	currency?: string;
}

export class CurrencyInput {
	#isInitialLoad = $state(true);
	#value = $state(0);
	#id = '';
	#setValue: (val: string) => void = () => {};
	#formatter: Intl.NumberFormat;
	#displayValue = $state('');

	constructor({
		id,
		initialValue = 0,
		setValue,
		locale = 'de-DE',
		currency = 'EUR'
	}: CurrencyInputOptions) {
		this.#value = initialValue;
		this.#setValue = setValue ?? (() => {});
		this.#id = id;

		this.#formatter = new Intl.NumberFormat(locale, {
			currency,
			currencySign: 'accounting',
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
			style: 'currency'
		});

		this.#displayValue = this.#formatCurrency(initialValue);
		this.#setValue(this.#displayValue);
		this.#isInitialLoad = false;

		$effect(() => {
			if (!this.#isInitialLoad) {
				this.#displayValue = this.#formatCurrency(this.#value);
				this.#setValue(this.#displayValue);
			}
		});
	}

	decrement = (event?: MouseEvent | KeyboardEvent) => {
		const step = event?.shiftKey ? 0.1 : 1;
		this.#value = Math.max(0, this.#value - step);
	};

	increment = (event?: MouseEvent | KeyboardEvent) => {
		const step = event?.shiftKey ? 0.1 : 1;
		this.#value += step;
	};

	#formatCurrency(amount: number): string {
		return this.#formatter.format(amount);
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

		// Handle empty input
		if (!cleanedInput) {
			this.#value = 0;
			this.#displayValue = this.#formatCurrency(0);
			this.#setValue(this.#displayValue);
			return;
		}

		this.#updateValue(cleanedInput);

		tick().then(() => {
			input.value = this.displayValue;
			const newCursorPosition = Math.min(cursorPosition ?? 0, input.value.length);
			input.setSelectionRange(newCursorPosition, newCursorPosition);
		});
	};

	#handleKeyDown = (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
		// Allow standard keyboard shortcuts (Ctrl+A, Delete, etc.)
		if (event.ctrlKey || event.metaKey) {
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				this.decrement(event);
				break;
			case 'ArrowUp':
				event.preventDefault();
				this.increment(event);
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

	get inputProps() {
		return {
			'aria-roledescription': 'Currency input',
			'aria-label': 'Currency amount',
			'aria-describedby': `${this.#id}-description`,
			autocomplete: 'off',
			autocorrect: 'off',
			id: this.#id,
			inputmode: 'numeric',
			onblur: this.#handleBlur,
			onfocus: this.#handleFocus,
			oninput: this.#handleInput,
			onkeydown: this.#handleKeyDown,
			spellcheck: false,
			type: 'text',
			value: this.displayValue
		} as const;
	}

	get decrementProps() {
		return {
			'aria-controls': this.#id,
			'aria-label': 'Decrease value',
			'aria-description': 'Hold Shift to decrease by 10 cents',
			'aria-labelledby': this.#id,
			id: 'decrement',
			onclick: (e: MouseEvent) => this.decrement(e),
			tabindex: -1
		} as const;
	}

	get incrementProps() {
		return {
			'aria-controls': this.inputProps.id,
			'aria-label': 'Increase value',
			'aria-description': 'Hold Shift to increase by 10 cents',
			'aria-labelledby': this.inputProps.id,
			id: 'increment',
			onclick: (e: MouseEvent) => this.increment(e),
			tabindex: -1
		} as const;
	}
}
