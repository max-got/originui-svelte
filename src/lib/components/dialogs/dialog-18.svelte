<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Label from '$lib/components/ui/label.svelte';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';

	import Check from 'lucide-svelte/icons/check';
	import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Change plan</Dialog.Trigger>
	<Dialog.Content>
		<div class="mb-2 flex flex-col gap-2">
			<div
				class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
				aria-hidden="true"
			>
				<RefreshCcw class="opacity-80" size={16} strokeWidth={2} />
			</div>
			<Dialog.Header>
				<Dialog.Title class="text-left">Change your plan</Dialog.Title>
				<Dialog.Description class="text-left">Pick one of the following plans.</Dialog.Description>
			</Dialog.Header>
		</div>

		<form class="space-y-5">
			<RadioGroup class="gap-2" value="plan-02">
				<div
					class="relative flex w-full items-center gap-2 rounded-lg border border-input px-4 py-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
				>
					<RadioGroupItem
						value="plan-01"
						id="plan-01"
						aria-describedby="plan-01-description"
						class="order-1 after:absolute after:inset-0"
					/>
					<div class="grid grow gap-1">
						<Label for="plan-01">Essential</Label>
						<p id="plan-01-description" class="text-xs text-muted-foreground">
							$4 per member/month
						</p>
					</div>
				</div>
				<div
					class="relative flex w-full items-center gap-2 rounded-lg border border-input px-4 py-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
				>
					<RadioGroupItem
						value="plan-02"
						id="plan-02"
						aria-describedby="plan-02-description"
						class="order-1 after:absolute after:inset-0"
					/>
					<div class="grid grow gap-1">
						<Label for="plan-02">Standard</Label>
						<p id="plan-02-description" class="text-xs text-muted-foreground">
							$19 per member/month
						</p>
					</div>
				</div>
				<div
					class="relative flex w-full items-center gap-2 rounded-lg border border-input px-4 py-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
				>
					<RadioGroupItem
						value="plan-03"
						id="plan-03"
						aria-describedby="plan-03-description"
						class="order-1 after:absolute after:inset-0"
					/>
					<div class="grid grow gap-1">
						<Label for="plan-03">Enterprise</Label>
						<p id="plan-03-description" class="text-xs text-muted-foreground">
							$32 per member/month
						</p>
					</div>
				</div>
			</RadioGroup>

			<div class="space-y-3">
				<p>
					<strong class="text-sm font-medium">Features include:</strong>
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex gap-2">
						<Check
							size={16}
							strokeWidth={2}
							class="mt-0.5 shrink-0 text-primary"
							aria-hidden="true"
						/>
						Create unlimited projects.
					</li>
					<li class="flex gap-2">
						<Check
							size={16}
							strokeWidth={2}
							class="mt-0.5 shrink-0 text-primary"
							aria-hidden="true"
						/>
						Remove watermarks.
					</li>
					<li class="flex gap-2">
						<Check
							size={16}
							strokeWidth={2}
							class="mt-0.5 shrink-0 text-primary"
							aria-hidden="true"
						/>
						Add unlimited users and free viewers.
					</li>
					<li class="flex gap-2">
						<Check
							size={16}
							strokeWidth={2}
							class="mt-0.5 shrink-0 text-primary"
							aria-hidden="true"
						/>
						Upload unlimited files.
					</li>
					<li class="flex gap-2">
						<Check
							size={16}
							strokeWidth={2}
							class="mt-0.5 shrink-0 text-primary"
							aria-hidden="true"
						/>
						7-day money back guarantee.
					</li>
					<li class="flex gap-2">
						<Check
							size={16}
							strokeWidth={2}
							class="mt-0.5 shrink-0 text-primary"
							aria-hidden="true"
						/>
						Advanced permissions.
					</li>
				</ul>
			</div>

			<div class="grid gap-2">
				<Button type="button" class="w-full">Change plan</Button>
				<Dialog.Close class="{buttonVariants({ variant: 'ghost' })} w-full">Cancel</Dialog.Close>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
