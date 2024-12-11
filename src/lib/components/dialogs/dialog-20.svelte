<script lang="ts">
	import { cn } from '$lib/utils';

	import Button, { buttonVariants } from '$lib/components/ui/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import DialogImg from '$lib/assets/dialog-content.png';

	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	const steps = [
		{
			title: 'Welcome to Origin UI',
			description:
				'Discover a powerful collection of components designed to enhance your development workflow.'
		},
		{
			title: 'Customizable Components',
			description:
				'Each component is fully customizable and built with modern web standards in mind.'
		},
		{
			title: 'Ready to Start?',
			description: 'Begin building amazing interfaces with our comprehensive component library.'
		},
		{
			title: 'Get Support',
			description:
				'Access our extensive documentation and community resources to make the most of Origin UI.'
		}
	];

	let step = $state(1);

	function handleContinue() {
		if (step < steps.length) {
			step += 1;
		}
	}
</script>

<Dialog.Root
	onOpenChange={(open) => {
		if (open) step = 1;
	}}
>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Onboarding</Dialog.Trigger>
	<Dialog.Content class="gap-0 p-0 [&>button:last-child]:text-white">
		<div class="p-2">
			<img class="w-full rounded-lg" src={DialogImg} width={382} height={216} alt="dialog" />
		</div>
		<div class="space-y-6 px-6 pb-6 pt-3">
			<Dialog.Header>
				<Dialog.Title>{steps[step - 1].title}</Dialog.Title>
				<Dialog.Description>{steps[step - 1].description}</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div class="flex justify-center space-x-1.5 max-sm:order-1">
					{#each { length: steps.length } as _, index}
						<div
							class={cn(
								'h-1.5 w-1.5 rounded-full bg-primary',
								index + 1 === step ? 'bg-primary' : 'opacity-20'
							)}
						/>
					{/each}
				</div>
				<Dialog.Footer>
					<Dialog.Close class={buttonVariants({ variant: 'ghost' })}>Skip</Dialog.Close>
					{#if step < steps.length}
						<Button class="group" type="button" onclick={handleContinue}>
							Next
							<ArrowRight
								className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
								size={16}
								strokeWidth={2}
								aria-hidden="true"
							/>
						</Button>
					{:else}
						<Dialog.Close class={buttonVariants()}>Okay</Dialog.Close>
					{/if}
				</Dialog.Footer>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
