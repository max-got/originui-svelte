<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Accordion as AccordionPrimitive } from 'bits-ui';

	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	const items = [
		{
			id: '1',
			title: 'Connected accounts',
			sub: 'Manage your linked social and work accounts',
			content:
				'Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.'
		},
		{
			id: '2',
			title: 'Notifications',
			sub: 'Customize your notification preferences',
			content:
				'Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.'
		},
		{
			id: '3',
			title: '2-step verification',
			sub: 'Add an extra layer of security to your account',
			content:
				'Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.'
		},
		{
			id: '4',
			title: 'Contact support',
			sub: "We're here to help 24/7",
			content:
				'Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.'
		}
	];
</script>

<div class="space-y-4">
	<h2 class="text-xl font-bold">W/ sub-header and chevron</h2>
	<Accordion.Root type="single" class="w-full" value="3">
		{#each items as item}
			<Accordion.Item value={item.id} class="py-2">
				<AccordionPrimitive.Header class="flex">
					<AccordionPrimitive.Trigger
						class="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&[data-state=open]>svg]:rotate-180"
					>
						<span class="flex flex-col space-y-1">
							<span>{item.title}</span>
							{#if item.sub}
								<span class="text-sm font-normal">{item.sub}</span>
							{/if}
						</span>
						<ChevronDown
							size={16}
							strokeWidth={2}
							class="shrink-0 opacity-60 transition-transform duration-200"
							aria-hidden="true"
						/>
					</AccordionPrimitive.Trigger>
				</AccordionPrimitive.Header>
				<Accordion.Content class="pb-2 text-muted-foreground">
					{item.content}
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</div>
