<script lang="ts">
	import type { User } from '$data/api/data/users.handlers';

	import {
		type ColumnDef,
<<<<<<< HEAD
<<<<<<< HEAD
		type ColumnSizingState,
=======
>>>>>>> 3708e39 (add table-14 & lint files)
=======
		type ColumnSizingState,
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
		getCoreRowModel,
		getSortedRowModel,
		type SortingState
	} from '@tanstack/table-core';
	import { fetchUsers } from '$data/api/data/users';
	import { createSvelteTable, FlexRender, renderSnippet } from '$lib/components/ui/data-table';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { cn } from '$lib/utils';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { createRawSnippet } from 'svelte';

	const columns: ColumnDef<User>[] = [
		{
			accessorKey: 'name',
			cell: ({ row }) => {
				const nameSnippet = createRawSnippet<[string]>((getName) => {
					const name = getName();
					return {
						render: () => `<div class="truncate font-medium">${name}</div>`
					};
				});
				return renderSnippet(nameSnippet, row.getValue('name'));
			},
			header: 'Name',
			sortDescFirst: false,
			sortUndefined: 'last'
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
			header: 'Status'
		},
		{
<<<<<<< HEAD
<<<<<<< HEAD
=======
			// cell: ({ row }) => {
			// 	return renderSnippet(
			// 		createRawSnippet((getBalance) => {
			// 			const balance = getBalance() as string;
			// 			const formatted = new Intl.NumberFormat('en-US', {
			// 				currency: 'USD',
			// 				style: 'currency'
			// 			}).format(parseFloat(balance));
			// 			return {
			// 				render: () => `<div class="text-right">${formatted}</div>`
			// 			};
			// 		}),
			// 		row.getValue('balance')
			// 	);
			// },
>>>>>>> 3708e39 (add table-14 & lint files)
=======
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
			accessorKey: 'balance',
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue('balance'));
				const formatted = new Intl.NumberFormat('en-US', {
					currency: 'USD',
					style: 'currency'
				}).format(amount);
				return formatted;
			},
			header: 'Balance'
		},
		{
			accessorKey: 'department',
			header: 'Department'
		},
		{
			accessorKey: 'role',
			header: 'Role'
		},
		{
			accessorKey: 'joinDate',
			header: 'Join Date'
		},
		{
			accessorKey: 'lastActive',
			header: 'Last Active'
		},
		{
			accessorKey: 'performance',
			header: 'Performance'
		}
	];

	let sorting = $state<SortingState>([
		{
			desc: false,
			id: 'name'
		}
	]);
<<<<<<< HEAD
<<<<<<< HEAD

	let columnSizing = $state<ColumnSizingState>({});

	let data = $state<User[]>([]);
=======
	let data = $state<User[]>([]);

>>>>>>> 3708e39 (add table-14 & lint files)
=======

	let columnSizing = $state<ColumnSizingState>({});

	let data = $state<User[]>([]);
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
	$effect(() => {
		fetchUsers()
			.then((response) => {
				data = response.slice(0, 5);
			})
			.catch((err) => {
				console.error(err);
			});
	});

	const table = createSvelteTable<User>({
		columnResizeMode: 'onChange',
		columns,
		get data() {
			return data;
		},
<<<<<<< HEAD
<<<<<<< HEAD
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnSizingChange: (updater) => {
			if (typeof updater === 'function') {
				columnSizing = updater(columnSizing);
			} else {
				columnSizing = updater;
			}
		},
=======
		enableSortingRemoval: false,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
>>>>>>> 3708e39 (add table-14 & lint files)
=======
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnSizingChange: (updater) => {
			if (typeof updater === 'function') {
				columnSizing = updater(columnSizing);
			} else {
				columnSizing = updater;
			}
		},
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		state: {
<<<<<<< HEAD
<<<<<<< HEAD
			get columnSizing() {
				return columnSizing;
			},
=======
>>>>>>> 3708e39 (add table-14 & lint files)
=======
			get columnSizing() {
				return columnSizing;
			},
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
			get sorting() {
				return sorting;
			}
		}
	});
</script>

<div>
	<Table class="table-fixed" style="width: {table.getCenterTotalSize()}px">
		<TableHeader>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<TableRow class="bg-muted/50">
					{#each headerGroup.headers as header (header.id)}
						<TableHead
<<<<<<< HEAD
<<<<<<< HEAD
							class="relative h-10 select-none border-t [&:last-child>.cursor-col-resize]:opacity-0"
=======
							class="relative h-10 select-none border-t last:[&>.cursor-col-resize]:opacity-0"
>>>>>>> 3708e39 (add table-14 & lint files)
=======
							class="relative h-10 select-none border-t [&:last-child>.cursor-col-resize]:opacity-0"
>>>>>>> f51a9a2 (fix: update cursor opacity for last child in table-14 header)
							aria-sort={header.column.getIsSorted() === 'asc'
								? 'ascending'
								: header.column.getIsSorted() === 'desc'
									? 'descending'
									: 'none'}
							colspan={header.colSpan}
<<<<<<< HEAD
<<<<<<< HEAD
							style="width: {header.getSize()}px"
=======
							style="width: {header.getSize()}"
>>>>>>> 3708e39 (add table-14 & lint files)
=======
							style="width: {header.getSize()}px"
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
						>
							{#if !header.isPlaceholder}
								<div
									class={cn(
										header.column.getCanSort() &&
											'flex h-full cursor-pointer select-none items-center justify-between gap-2'
									)}
									onclick={header.column.getToggleSortingHandler()}
									onkeydown={(e) => {
										// Enhanced keyboard handling for sorting
										if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
											e.preventDefault();
											header.column.getToggleSortingHandler()?.(e);
										}
									}}
									tabindex={header.column.getCanSort() ? 0 : undefined}
								>
									<span class="truncate">
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									</span>
									{#if header.column.getIsSorted() === 'asc'}
										<ChevronUp class="shrink-0 opacity-60" size={16} aria-hidden="true" />
									{:else if header.column.getIsSorted() === 'desc'}
										<ChevronDown class="shrink-0 opacity-60" size={16} aria-hidden="true" />
									{/if}
								</div>
							{/if}
							{#if header.column.getCanResize()}
								<div
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
									class="user-select-none absolute -right-2 top-0 z-10 flex h-full w-4 cursor-col-resize touch-none justify-center before:absolute before:inset-y-0 before:w-px before:translate-x-px before:bg-border"
									ondblclick={() => header.column.resetSize()}
									onmousedown={header.getResizeHandler()}
									ontouchstart={header.getResizeHandler()}
<<<<<<< HEAD
=======
									{...{
										className:
											'absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px',
										onDoubleClick: () => header.column.resetSize(),
										onMouseDown: header.getResizeHandler(),
										onTouchStart: header.getResizeHandler()
									}}
>>>>>>> 3708e39 (add table-14 & lint files)
=======
>>>>>>> 7a24568 (refactor: enhance table-14 with column sizing state management and cleanup unused code)
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
						<TableCell class="truncate">
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
	</Table>
	<p class="mt-4 text-center text-sm text-muted-foreground">
		Resizable and sortable columns made with
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
