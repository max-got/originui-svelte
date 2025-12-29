<script lang="ts">
	import { getFakeUsers, type User } from '$lib/registry/default/data/users.data.remote';
	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';

	import {
		closestCenter,
		DndContext,
		type DragEndEvent,
		KeyboardSensor,
		MouseSensor,
		TouchSensor,
		useSensor,
		useSensors
	} from '@dnd-kit-svelte/core';
	import { restrictToHorizontalAxis } from '@dnd-kit-svelte/modifiers';
	import {
		arrayMove,
		horizontalListSortingStrategy,
		SortableContext,
		useSortable
	} from '@dnd-kit-svelte/sortable';
	import { CSS, styleObjectToString } from '@dnd-kit-svelte/utilities';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import GripVertical from '@lucide/svelte/icons/grip-vertical';
	import {
		type Cell,
		type ColumnDef,
		getCoreRowModel,
		getSortedRowModel,
		type Header,
		type SortingState
	} from '@tanstack/table-core';

	import Badge from '$lib/components/ui/badge.svelte';
	import Button from '$lib/registry/default/ui/button.svelte';
	import {
		createSvelteTable,
		FlexRender,
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
			accessorKey: 'name',
			cell: ({ row }) => {
				return renderSnippet(NameCell, { name: row.getValue('name') as string });
			},
			header: 'Name',
			id: 'name',
			sortDescFirst: false,
			sortUndefined: 'last'
		},
		{
			accessorKey: 'email',
			header: 'Email',
			id: 'email'
		},
		{
			accessorKey: 'location',
			cell: ({ row }) => {
				return renderSnippet(LocationCell, {
					flag: row.original.flag,
					location: row.getValue('location') as string
				});
			},
			header: 'Location',
			id: 'location'
		},
		{
			accessorKey: 'status',
			cell: ({ row }) => {
				const status = row.getValue('status') as string;
				return renderSnippet(StatusCell, { status });
			},
			header: 'Status',
			id: 'status'
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
			},
			id: 'balance'
		}
	];

	let data = $derived(await getFakeUsers({ count: 5 }));
	let sorting = $state<SortingState>([
		{
			desc: false,
			id: 'name'
		}
	]);
	let columnOrder = $state<string[]>(columns.map((column) => column.id ?? ''));

	const table = createSvelteTable<User>({
		columnResizeMode: 'onChange',
		columns,
		get data() {
			return data.data;
		},
		enableSortingRemoval: false,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnOrderChange: (updater) => {
			if (typeof updater === 'function') {
				columnOrder = updater(columnOrder);
			} else {
				columnOrder = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		state: {
			get columnOrder() {
				return columnOrder;
			},
			get sorting() {
				return sorting;
			}
		}
	});

	// reorder columns after drag & drop
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		const snapshottedActive = $state.snapshot(active);
		const snapshottedOver = $state.snapshot(over);

		if (snapshottedActive && snapshottedOver && snapshottedActive.id !== snapshottedOver.id) {
			table.setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(snapshottedActive.id as string);
				const newIndex = columnOrder.indexOf(snapshottedOver.id as string);
				return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
			});
		}
	}

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);

	// Cache sortable instances per column
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	const sortables = new Map<string, ReturnType<typeof useSortable>>();

	function getSortable(id: string) {
		if (!sortables.has(id)) {
			$effect.root(() => {
				sortables.set(id, useSortable({ id }));
			});
		}
		return sortables.get(id)!;
	}

	function createDragHandleAttachment(columnId: string): Attachment<HTMLElement> {
		return (element) => {
			const sortable = getSortable(columnId);
			sortable.setActivatorNodeRef(element);

			Object.entries(sortable.attributes.current)
				.filter(([_, value]) => Boolean(value))
				.forEach(([key, value]) => {
					element.setAttribute(key, value);
				});

			const listeners = sortable.listeners.current;
			const cleanups: Array<ReturnType<typeof on>> = [];

			if (listeners.onmousedown) {
				const mouseDownCleanUp = on(element, 'mousedown', listeners.onmousedown);
				cleanups.push(mouseDownCleanUp);
			}
			if (listeners.ontouchstart) {
				const touchStartCleanUp = on(element, 'touchstart', listeners.ontouchstart);
				cleanups.push(touchStartCleanUp);
			}
			if (listeners.onkeydown) {
				const keyDownCleanUp = on(element, 'keydown', listeners.onkeydown);
				cleanups.push(keyDownCleanUp);
			}

			return () => cleanups.forEach((cleanup) => cleanup());
		};
	}

	function createHeaderDragAttachment(header: Header<User, unknown>): Attachment {
		return (element) => {
			const sortable = getSortable(header.column.id);
			sortable.setNodeRef(element as HTMLElement);

			const style = styleObjectToString({
				opacity: sortable.isDragging.current ? 0.8 : 1,
				position: 'relative',
				transform: CSS.Transform.toString(sortable.transform.current),
				transition: sortable.transition.current,
				whiteSpace: 'nowrap',
				width: header.column.getSize() + 'px',
				zIndex: sortable.isDragging.current ? 1 : undefined
			});
			element.setAttribute('style', style);

			Object.entries(sortable.attributes.current)
				.filter(([_, value]) => Boolean(value))
				.forEach(([key, value]) => {
					element.setAttribute(key, value);
				});

			const ariaSort =
				header.column.getIsSorted() === 'asc'
					? 'ascending'
					: header.column.getIsSorted() === 'desc'
						? 'descending'
						: 'none';

			element.setAttribute('aria-sort', ariaSort);
		};
	}

	function createCellDragAttachment(cell: Cell<User, unknown>): Attachment {
		return (element) => {
			const sortable = getSortable(cell.column.id);
			const style = styleObjectToString({
				opacity: sortable.isDragging.current ? 0.8 : 1,
				position: 'relative',
				transform: CSS.Transform.toString(sortable.transform.current),
				transition: sortable.isSorting.current ? sortable.transition.current : undefined,
				width: cell.column.getSize(),
				zIndex: sortable.isDragging.current ? 1 : 0
			});
			element.setAttribute('style', style);

			Object.entries(sortable.attributes.current)
				.filter(([_, value]) => Boolean(value))
				.forEach(([key, value]) => {
					element.setAttribute(key, value);
				});
		};
	}

	const id = $props.id();
</script>

{#snippet DraggableTableHeader(header: Header<User, unknown>)}
	<TableHead
		class="before:bg-border relative h-10 border-t before:absolute before:inset-y-0 before:start-0 before:w-px first:before:bg-transparent"
		{@attach createHeaderDragAttachment(header)}
	>
		<div class="flex items-center justify-start gap-0.5">
			<Button
				size="icon"
				variant="ghost"
				class="-ml-2 size-7 shadow-none"
				{@attach createDragHandleAttachment(header.column.id)}
				aria-label="Drag to reorder"
			>
				<GripVertical class="opacity-60" size={16} aria-hidden="true" />
			</Button>

			<span class="grow truncate">
				{#if !header.isPlaceholder}
					<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
				{/if}
			</span>
			<Button
				size="icon"
				variant="ghost"
				class="group -mr-1 size-7 shadow-none"
				onclick={header.column.getToggleSortingHandler()}
				onkeydown={(e) => {
					// Enhanced keyboard handling for sorting
					if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
						e.preventDefault();
						header.column.getToggleSortingHandler()?.(e);
					}
				}}
			>
				{#if header.column.getIsSorted() === 'asc'}
					<ChevronUp class="shrink-0 opacity-60" size={16} aria-hidden="true" />
				{:else if header.column.getIsSorted() === 'desc'}
					<ChevronDown class="shrink-0 opacity-60" size={16} aria-hidden="true" />
				{:else if header.column.getIsSorted() === false}
					<ChevronUp
						class="shrink-0 opacity-0 group-hover:opacity-60"
						size={16}
						aria-hidden="true"
					/>
				{/if}
			</Button>
		</div>
	</TableHead>
{/snippet}

{#snippet DragAlongCell(cell: Cell<User, unknown>)}
	<TableCell class="truncate" {@attach createCellDragAttachment(cell)}>
		<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
	</TableCell>
{/snippet}

{#snippet NameCell({ name }: { name: string })}
	<div class="truncate font-medium">{name}</div>
{/snippet}

{#snippet LocationCell({ flag, location }: { flag: string; location: string })}
	<div class="truncate">
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

<DndContext
	{id}
	collisionDetection={closestCenter}
	modifiers={[restrictToHorizontalAxis]}
	onDragEnd={handleDragEnd}
	{sensors}
>
	<Table>
		<TableHeader>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<TableRow class="bg-muted/50">
					<SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
						{#each headerGroup.headers as header (header.id)}
							{@render DraggableTableHeader(header)}
						{/each}
					</SortableContext>
				</TableRow>
			{/each}
		</TableHeader>
		<TableBody>
			{#each table.getRowModel().rows as row (row.id)}
				<TableRow data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
							{@render DragAlongCell(cell)}
						</SortableContext>
					{/each}
				</TableRow>
			{:else}
				<TableRow>
					<TableCell colspan={columns.length} class="h-24 text-center">No results.</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	<p class="text-muted-foreground mt-4 text-center text-sm">
		Draggable columns made with
		<a
			class="hover:text-foreground underline"
			href="https://tanstack.com/table"
			target="_blank"
			rel="noopener noreferrer"
		>
			TanStack Table
		</a>
		and
		<a
			class="hover:text-foreground underline"
			href="https://dnd-kit-svelte.vercel.app/"
			target="_blank"
			rel="noopener noreferrer"
		>
			dnd kit
		</a>
	</p>
</DndContext>
