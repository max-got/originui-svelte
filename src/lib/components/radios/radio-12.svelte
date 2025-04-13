<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';

	import IconApple from '~icons/ri/apple-line';
	import IconBankCard from '~icons/ri/bank-card-line';
	import IconPaypal from '~icons/ri/paypal-line';

	const items = [
		{ Icon: IconBankCard, id: 'radio-12-cc', label: 'Card', value: 'cc' },
		{ Icon: IconPaypal, id: 'radio-12-paypal', label: 'PayPal', value: 'paypal' },
		{ Icon: IconApple, id: 'radio-12-apple-pay', label: 'Apple Pay', value: 'apple-pay' }
	];

	let selectedValue = $state('cc');
</script>

<RadioGroup class="grid grid-cols-3 gap-2" bind:value={selectedValue}>
	{#each items as item (item.id)}
		<label
			class="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/[.04] ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2"
		>
			<RadioGroupItem
				id={item.id}
				value={item.value}
				class="sr-only after:absolute after:inset-0"
			/>
			<item.Icon class="opacity-60" width="20" height="20" aria-hidden="true" />
			<p class="text-xs font-medium leading-none text-foreground">{item.label}</p>
		</label>
	{/each}
</RadioGroup>
