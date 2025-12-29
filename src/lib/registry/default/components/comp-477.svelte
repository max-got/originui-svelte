<script lang="ts">
	import { getFakeUsers, type User } from '$lib/registry/default/data/users.data.remote';

	import { type ColumnDef, getCoreRowModel, type RowSelectionState } from '@tanstack/table-core';

	import Badge from '$lib/components/ui/badge.svelte';
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
		TableFooter,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/registry/default/ui/table';

	const columns: ColumnDef<User>[] = [
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
	let data = $derived(await getFakeUsers({ count: 5 }));

	const table = createSvelteTable<User>({
		columns,
		get data() {
			return data.data;
		},
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		state: {
			get rowSelection() {
				return rowSelection;
			}
		}
	});
</script>

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
						<TableCell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</TableCell>
					{/each}
				</TableRow>
			{:else}
				<TableRow>
					<TableCell colspan={columns.length} class="h-24 text-center">No results.</TableCell>
				</TableRow>
			{/each}
		</TableBody>
		<TableFooter class="bg-transparent">
			<TableRow class="hover:bg-transparent">
				<TableCell colspan={5}>Total</TableCell>
				<TableCell class="text-right">
					{new Intl.NumberFormat('en-US', {
						currency: 'USD',
						style: 'currency'
					}).format(data.data.reduce((total, item) => total + item.balance, 0))}
				</TableCell>
			</TableRow>
		</TableFooter>
	</Table>
	<p class="text-muted-foreground mt-4 text-center text-sm">
		Basic data table made with
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
