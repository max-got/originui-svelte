<script lang="ts">
<<<<<<< HEAD
	import type { User } from '$data/api/data/users.handlers';

=======
	import TableHead from '../ui/table/table-head.svelte';
	import TableHeader from '../ui/table/table-header.svelte';
>>>>>>> 84bdadf (fet: table 12 - tanstack basic)
	import Badge from '$lib/components/ui/badge.svelte';
	import Checkbox from '$lib/components/ui/checkbox.svelte';

	import { type ColumnDef, getCoreRowModel, type RowSelectionState } from '@tanstack/table-core';
<<<<<<< HEAD
	import { fetchUsers } from '$data/api/data/users';
	import {
		createSvelteTable,
		FlexRender,
		renderComponent,
		renderSnippet
	} from '$lib/components/ui/data-table';
	import {
		Table,
		TableBody,
		TableCell,
		TableFooter,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { cn } from '$lib/utils';
	import { createRawSnippet } from 'svelte';

	let rowSelection = $state<RowSelectionState>({});

	const columns: ColumnDef<User>[] = [
=======
	import { Table, TableBody, TableCell, TableRow } from '$lib/components/ui/table';
	import { cn } from '$lib/utils';
	import { createRawSnippet } from 'svelte';

	import { createSvelteTable, FlexRender, renderComponent, renderSnippet } from '../ui/data-table';

	type Item = {
		balance: number;
		email: string;
		flag: string;
		id: string;
		location: string;
		name: string;
		status: 'Active' | 'Inactive' | 'Pending';
	};

	let rowSelection = $state<RowSelectionState>({});

	const columns: ColumnDef<Item>[] = [
>>>>>>> 84bdadf (fet: table 12 - tanstack basic)
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
				const nameSnippet = createRawSnippet<[string]>((getName) => {
					const name = getName();
					return {
						render: () => `<div class="font-medium">${name}</div>`
					};
				});
				return renderSnippet(nameSnippet, row.getValue('name'));
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
				const locationSnippet = createRawSnippet<[{ flag: string; location: string }]>((args) => {
					const { flag, location } = args();
					return {
						render: () => `
							<div>
								<span class="text-lg leading-none">${flag}</span>
								${location}
							</div>`
					};
				});
				return renderSnippet(locationSnippet, {
					flag: row.original.flag,
					location: row.getValue('location') as string
				});
			},
			header: 'Location'
		},
		{
			accessorKey: 'status',
			cell: ({ row }) =>
				renderComponent(Badge, {
					children: createRawSnippet(() => {
<<<<<<< HEAD
						const status = row.getValue('status') as string;
						return {
							render: () => status
						};
					}),

=======
						const status = row.getValue('status');
						return {
							render: () => `${status}`
						};
					}),
>>>>>>> 84bdadf (fet: table 12 - tanstack basic)
					class: cn(
						row.getValue('status') === 'Inactive' &&
							'bg-muted-foreground/60 text-primary-foreground'
					)
				}),
			header: 'Status'
		},
		{
			accessorKey: 'balance',
			cell: ({ row }) => {
				return renderSnippet(
					createRawSnippet((getBalance) => {
						const balance = getBalance() as string;
						const formatted = new Intl.NumberFormat('en-US', {
							currency: 'USD',
							style: 'currency'
						}).format(parseFloat(balance));
						return {
							render: () => `<div class="text-right">${formatted}</div>`
						};
					}),
					row.getValue('balance')
				);
			},
			header: () => {
				const nameSnippet = createRawSnippet(() => {
					return {
						render: () => `<div class="text-right">Balance</div>`
					};
				});
				return renderSnippet(nameSnippet, {});
			}
		}
	];

<<<<<<< HEAD
	let data = $state<User[]>([]);

	$effect(() => {
		fetchUsers()
			.then((response) => {
				data = response.slice(0, 5);
=======
	let data = $state<Item[]>([]);

	$effect(() => {
		if (data.length > 0) return;
		fetch('/api/v1/data/data-table')
			.then((res) => res.json())
			.then((d: { data: Item[] }) => {
				data = d.data.slice(0, 5);
>>>>>>> 84bdadf (fet: table 12 - tanstack basic)
			})
			.catch((err) => {
				console.error(err);
			});
	});

<<<<<<< HEAD
	const table = createSvelteTable<User>({
=======
	const table = createSvelteTable<Item>({
>>>>>>> 84bdadf (fet: table 12 - tanstack basic)
		columns,
		get data() {
			return data;
		},
<<<<<<< HEAD
		getCoreRowModel: getCoreRowModel(),
=======
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),

>>>>>>> 84bdadf (fet: table 12 - tanstack basic)
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
<<<<<<< HEAD
		<TableFooter class="bg-transparent">
			<TableRow class="hover:bg-transparent">
				<TableCell colspan={5}>Total</TableCell>
				<TableCell class="text-right">
					{new Intl.NumberFormat('en-US', {
						currency: 'USD',
						style: 'currency'
					}).format(data.reduce((total, item) => total + item.balance, 0))}
				</TableCell>
			</TableRow>
		</TableFooter>
=======
>>>>>>> 84bdadf (fet: table 12 - tanstack basic)
	</Table>
	<p class="mt-4 text-center text-sm text-muted-foreground">
		Basic data table made with
		<a
			class="underline hover:text-foreground"
			href="https://tanstack.com/table"
			target="_blank"
			rel="noopener noreferrer"
		>
			TanStack Table
		</a>
	</p>
</div>
