<script lang="ts">
	import { getFakeUsers, type User } from '../data/users.data.remote';

	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import Info from '@lucide/svelte/icons/info';
	import {
		type ColumnDef,
		type ExpandedState,
		getCoreRowModel,
		getExpandedRowModel,
		type RowSelectionState
	} from '@tanstack/table-core';

	import Badge from '$lib/components/ui/badge.svelte';
	import Button from '$lib/registry/default/ui/button.svelte';
	import Checkbox from '$lib/registry/default/ui/checkbox.svelte';
	import {
		createSvelteTable,
		FlexRender,
		renderComponent,
		renderSnippet
	} from '$lib/registry/default/ui/data-table';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/registry/default/ui/table';

	const columns: ColumnDef<User>[] = [
		{
			cell: ({ row }) => {
				if (!row.getCanExpand()) return;

				return renderSnippet(ExpanderButton, {
					isExpanded: row.getIsExpanded(),
					name: row.original.name,
					onclick: row.getToggleExpandedHandler()
				});
			},
			header: () => null,
			id: 'expander'
		},
		{
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					'aria-label': 'Select row',
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value)
				}),
			header: ({ table }) =>
				renderComponent(Checkbox, {
					'aria-label': 'Select all',
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
				}),
			id: 'select'
		},
		{
			accessorKey: 'name',
			cell: ({ row }) => {
				return renderSnippet(NameCell, { name: row.getValue('name') as string });
			},
			header: 'Name'
		},
		{
			accessorKey: 'email',
			header: 'Email'
		},
		{
			accessorKey: 'location',
			cell: ({ row }) => {
				return renderSnippet(LocationCell, {
					flag: row.original.flag,
					location: row.getValue('location') as string
				});
			},
			header: 'Location'
		},
		{
			accessorKey: 'status',
			cell: ({ row }) => {
				const status = row.getValue('status') as string;
				return renderSnippet(StatusCell, { status });
			},
			header: 'Status'
		},
		{
			accessorKey: 'balance',
			cell: ({ row }) => {
				return renderSnippet(BalanceCell, {
					balance: row.getValue('balance') as number
				});
			},
			header: () => {
				return renderSnippet(BalanceHeader, {});
			}
		}
	];

	let rowSelection = $state<RowSelectionState>({});
	let expanded = $state<ExpandedState>({});
	let data = $derived(await getFakeUsers({ count: 5 }));

	const table = createSvelteTable<User>({
		columns,
		get data() {
			return data.data;
		},
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: (row) => Boolean(row.original.note),
		onExpandedChange: (updater) => {
			if (typeof updater === 'function') {
				expanded = updater(expanded);
			} else {
				expanded = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		state: {
			get expanded() {
				return expanded;
			},
			get rowSelection() {
				return rowSelection;
			}
		}
	});
</script>

{#snippet ExpanderButton({
	isExpanded,
	name,
	onclick
}: {
	isExpanded: boolean;
	name: string;
	onclick: (e: Event) => void;
})}
	<Button
		aria-expanded={isExpanded}
		aria-label={isExpanded ? `Collapse details for ${name}` : `Expand details for ${name}`}
		class="text-muted-foreground size-7 shadow-none"
		{onclick}
		size="icon"
		variant="ghost"
	>
		{#if isExpanded}
			<ChevronUp aria-hidden="true" class="opacity-60" size={16} />
		{:else}
			<ChevronDown aria-hidden="true" class="opacity-60" size={16} />
		{/if}
	</Button>
{/snippet}

{#snippet NameCell({ name }: { name: string })}
	<div class="font-medium">{name}</div>
{/snippet}

{#snippet LocationCell({ flag, location }: { flag: string; location: string })}
	<div>
		<span class="text-lg leading-none">{flag}</span>
		{location}
	</div>
{/snippet}

{#snippet StatusCell({ status }: { status: string })}
	<Badge
		class="data-[status=Inactive]:bg-muted-foreground/60 data-[status=Inactive]:text-primary-foreground"
		data-status={status}
	>
		{status}
	</Badge>
{/snippet}

{#snippet BalanceCell({ balance }: { balance: number })}
	<div class="text-right">
		{new Intl.NumberFormat('en-US', {
			currency: 'USD',
			style: 'currency'
		}).format(balance)}
	</div>
{/snippet}

{#snippet BalanceHeader()}
	<div class="text-right">Balance</div>
{/snippet}

<div>
	<Table>
		<TableHeader>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<TableRow class="hover:bg-transparent">
					{#each headerGroup.headers as header (header.id)}
						<TableHead>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</TableHead>
					{/each}
				</TableRow>
			{/each}
		</TableHeader>
		<TableBody>
			{#each table.getRowModel().rows as row (row.id)}
				<TableRow data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<TableCell
							class="whitespace-nowrap [&:has([aria-expanded])]:w-px [&:has([aria-expanded])]:py-0 [&:has([aria-expanded])]:pr-0"
						>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</TableCell>
					{/each}
				</TableRow>
				{#if row.getIsExpanded()}
					<TableRow>
						<TableCell colspan={row.getVisibleCells().length}>
							<div class="text-primary/80 flex items-start py-2">
								<span class="me-3 mt-0.5 flex w-7 shrink-0 justify-center" aria-hidden="true">
									<Info class="opacity-60" size={16} />
								</span>
								<p class="text-sm">{row.original.note}</p>
							</div>
						</TableCell>
					</TableRow>
				{/if}
			{:else}
				<TableRow>
					<TableCell colspan={columns.length} class="h-24 text-center">No results.</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	<p class="text-muted-foreground mt-4 text-center text-sm">
		Expanding sub-row made with
		<a
			class="hover:text-foreground underline"
			href="https://tanstack.com/table"
			target="_blank"
			rel="noopener noreferrer"
		>
			TanStack Table
		</a>
	</p>
</div>
