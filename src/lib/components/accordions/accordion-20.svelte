<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger
	} from '$lib/components/ui/collapsible';
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import AtSign from 'lucide-svelte/icons/at-sign';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import CircleDashed from 'lucide-svelte/icons/circle-dashed';
	import Command from 'lucide-svelte/icons/command';
	import Eclipse from 'lucide-svelte/icons/eclipse';
	import Gauge from 'lucide-svelte/icons/gauge';
	import Plus from 'lucide-svelte/icons/plus';
	import Zap from 'lucide-svelte/icons/zap';

	const items = [
		{
			collapsibles: [
				{
					content: 'We optimize every component for maximum performance and minimal bundle size.',
					icon: Gauge,
					title: 'What about performance?'
				},
				{
					content:
						'Our documentation is comprehensive and includes live examples for every component.',
					icon: CircleDashed,
					title: 'How is the documentation?'
				}
			],
			icon: Command,
			id: '1',
			title: 'What makes Origin UI - Svelte different?'
		},
		{
			collapsibles: [
				{
					content:
						'Yes, our theming system is fully customizable and supports both light and dark modes.',
					icon: Gauge,
					title: 'Can I use custom themes?'
				},
				{
					content: 'We have first-class support for Tailwind CSS with custom utility classes.',
					icon: CircleDashed,
					title: 'What about Tailwind support?'
				}
			],
			icon: Eclipse,
			id: '2',
			title: 'How can I customize the components?'
		},
		{
			collapsibles: [
				{
					content:
						'Our components are tree-shakeable and typically add minimal overhead to your bundle.',
					icon: Gauge,
					open: true,
					title: "What's the bundle size impact?"
				},
				{
					content: 'We support automatic code splitting for optimal loading performance.',
					icon: CircleDashed,
					title: 'How is code splitting handled?'
				}
			],
			icon: Zap,
			id: '3',
			title: 'Is Origin UI - Svelte optimized for performance?'
		},
		{
			collapsibles: [
				{
					content: 'We test with NVDA, VoiceOver, and JAWS to ensure broad compatibility.',
					icon: Gauge,
					title: 'Which screen readers are supported?'
				},
				{
					content:
						'Full keyboard navigation support is implemented following WAI-ARIA best practices.',
					icon: CircleDashed,
					title: 'What about keyboard navigation?'
				}
			],
			icon: AtSign,
			id: '4',
			title: 'How accessible are the components?'
		}
	];
</script>

<div class="space-y-4">
	<h2 class="text-xl font-bold">Table w/ left plus-minus</h2>
	<Accordion.Root type="single" class="w-full -space-y-px" value="3">
		{#each items as item (item.id)}
			<Accordion.Item
				value={item.id}
				class="border bg-background px-4 py-1 first:rounded-t-lg last:rounded-b-lg"
			>
				<AccordionPrimitive.Trigger
					class="flex flex-1 items-center gap-3 py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&>svg]:-order-1 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180"
				>
					{item.title}
					<Plus
						size={16}
						strokeWidth={2}
						class="shrink-0 opacity-60 transition-transform duration-200"
						aria-hidden="true"
					/>
				</AccordionPrimitive.Trigger>

				<Accordion.Content class="p-0">
					{#each item.collapsibles as collapsible (collapsible.title)}
						{@render CollapsibleDemo({
							content: collapsible.content,
							Icon: collapsible.icon,
							open: collapsible.open ?? false,
							title: collapsible.title
						})}
					{/each}
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</div>

{#snippet CollapsibleDemo({
	content,
	Icon,
	open,
	title
}: {
	content: string;
	Icon: typeof Gauge;
	open: boolean;
	title: string;
})}
	<Collapsible class="space-y-1 border-t border-border py-3 pe-4 ps-6" {open}>
		<CollapsibleTrigger
			class="flex gap-2 text-[15px] font-semibold leading-6 [&[data-state=open]>svg]:rotate-180"
		>
			<ChevronDown
				size={16}
				strokeWidth={2}
				class="mt-1 shrink-0 opacity-60 transition-transform duration-200"
				aria-hidden="true"
			/>
			<span class="flex items-center gap-3">
				<Icon size={16} stroke-width={2} className="shrink-0 opacity-60" aria-hidden="true" />
				<span>{title}</span>
			</span>
		</CollapsibleTrigger>
		<CollapsibleContent
			class="overflow-hidden ps-6 text-sm text-muted-foreground transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
		>
			{content}
		</CollapsibleContent>
	</Collapsible>
{/snippet}
