<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Sign in</Dialog.Trigger>
	<Dialog.Content>
		<div class="flex flex-col items-center gap-2">
			<div
				class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
				aria-hidden="true"
			>
				<svg
					class="stroke-zinc-800 dark:stroke-zinc-100"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 32 32"
					aria-hidden="true"
				>
					<circle cx="16" cy="16" r="12" fill="none" stroke-width="8" />
				</svg>
			</div>
			<Dialog.Header>
				<Dialog.Title class="sm:text-center">Welcome back</Dialog.Title>
				<Dialog.Description class="sm:text-center">
					Enter your credentials to login to your account.
				</Dialog.Description>
			</Dialog.Header>
		</div>

		<form class="space-y-5">
			<div class="space-y-4">
				<div class="space-y-2">
					<Label for="login-email">Email</Label>
					<Input id="login-email" placeholder="hi@yourcompany.com" type="email" required />
				</div>
				<div class="space-y-2">
					<Label for="login-password">Password</Label>
					<Input id="login-password" placeholder="Enter your password" type="password" required />
				</div>
			</div>
			<div class="flex justify-between gap-2">
				<div class="flex items-center gap-2">
					<Checkbox id="login-remember" />
					<Label for="login-remember" class="font-normal text-muted-foreground">Remember me</Label>
				</div>
				<a class="text-sm underline hover:no-underline" href="#title">Forgot password?</a>
			</div>
			<Button type="button" class="w-full">Sign in</Button>
		</form>

		<div
			class="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
		>
			<span class="text-xs text-muted-foreground">Or</span>
		</div>

		<Button variant="outline">Login with Google</Button>
	</Dialog.Content>
</Dialog.Root>
