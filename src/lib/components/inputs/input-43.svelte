<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import { useLocale } from '$lib/hooks/use-locale.svelte';
	import { cn } from '$lib/utils.js';

	import { type DateValue, getLocalTimeZone, isWeekend, today } from '@internationalized/date';
	import { type DateRange, DateRangePicker, type DateRangeValidator } from 'bits-ui';
	import Calendar from 'lucide-svelte/icons/calendar';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	let now = today(getLocalTimeZone());
	let value: DateRange = $state({ end: undefined, start: undefined });
	let locale = useLocale();

	// Define disabled date ranges
	const disabledRanges = [
		[now, now.add({ days: 5 })],
		[now.add({ days: 14 }), now.add({ days: 16 })],
		[now.add({ days: 23 }), now.add({ days: 24 })]
	];

	// Check if a date is unavailable
	function isDateUnavailable(date: DateValue) {
		return (
			isWeekend(date, locale.locale) ||
			disabledRanges.some(
				(interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
			)
		);
	}

	// Validate the selected range
	const validate: DateRangeValidator = (value: DateRange) => {
		if (!value?.start || !value?.end) return;
		const hasOverlap = disabledRanges.some((interval) => {
			const rangeEnd = value.end!.compare(interval[0]) >= 0;
			const rangeStart = value.start!.compare(interval[1]) <= 0;
			return rangeEnd && rangeStart;
		});
		if (!hasOverlap) return;

		return 'Selected date range may not include unavailable dates.';
	};
</script>

<DateRangePicker.Root
	bind:value
	locale={locale.locale}
	minValue={now}
	{validate}
	{isDateUnavailable}
	weekdayFormat="short"
	fixedWeeks={true}
	class="space-y-2"
>
	<Label class="text-sm font-medium text-foreground">Date range picker (unavailable dates)</Label>
	<div class="flex">
		<div
			class="inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2"
		>
			{#each ['start', 'end'] as const as type}
				<DateRangePicker.Input {type}>
					{#snippet children({ segments })}
						{#each segments as { part, value }}
							<DateRangePicker.Segment
								{part}
								class="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50 data-[unavailable]:opacity-50"
							>
								{value}
							</DateRangePicker.Segment>
						{/each}
					{/snippet}
				</DateRangePicker.Input>
				{#if type === 'start'}
					<span aria-hidden="true" class="px-2 text-muted-foreground/70">-</span>
				{/if}
			{/each}
		</div>

		<DateRangePicker.Trigger
			class="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:text-foreground focus-visible:outline-none data-[focus-visible]:border data-[focus-visible]:border-ring data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2"
		>
			<Calendar size={16} stroke-width={2} />
		</DateRangePicker.Trigger>
	</div>

	<DateRangePicker.Content
		class="z-50 rounded-lg border border-input bg-background text-foreground shadow-lg shadow-black/[.04] outline-none"
	>
		<DateRangePicker.Calendar class="w-fit p-2">
			{#snippet children({ months, weekdays })}
				<!-- Calendar header and navigation -->
				<DateRangePicker.Header class="flex w-full items-center gap-1 pb-1">
					<DateRangePicker.PrevButton
						class="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground"
					>
						<ChevronLeft size={16} stroke-width={2} />
					</DateRangePicker.PrevButton>
					<DateRangePicker.Heading class="grow text-center text-sm font-medium" />
					<DateRangePicker.NextButton
						class="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground"
					>
						<ChevronRight size={16} stroke-width={2} />
					</DateRangePicker.NextButton>
				</DateRangePicker.Header>

				<!-- Calendar grid -->
				<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
					{#each months as month}
						<DateRangePicker.Grid class="w-fit border-collapse select-none space-y-1">
							<DateRangePicker.GridHead>
								<DateRangePicker.GridRow class="flex w-full justify-between">
									{#each weekdays as day}
										<DateRangePicker.HeadCell
											class="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80"
										>
											{day.slice(0, 2)}
										</DateRangePicker.HeadCell>
									{/each}
								</DateRangePicker.GridRow>
							</DateRangePicker.GridHead>

							<DateRangePicker.GridBody class="[&_td]:px-0">
								{#each month.weeks as weekDates}
									<DateRangePicker.GridRow class="flex w-full">
										{#each weekDates as date}
											<DateRangePicker.Cell
												{date}
												month={month.value}
												class={cn(
													'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground ring-offset-background duration-150 [transition-property:border-radius,box-shadow] focus-visible:outline-none data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[selected]:rounded-none data-[selection-end]:rounded-e-lg data-[selection-start]:rounded-s-lg data-[focus-visible]:border-ring data-[hovered]:bg-accent data-[invalid]:bg-red-100 data-[selected]:bg-accent data-[hovered]:text-foreground data-[selected]:text-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2 data-[invalid]:data-[selection-end]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selection-start]:[&:not([data-hover])]:bg-destructive data-[selection-end]:[&:not([data-hover])]:bg-primary data-[selection-start]:[&:not([data-hover])]:bg-primary data-[invalid]:data-[selection-end]:[&:not([data-hover])]:text-destructive-foreground data-[invalid]:data-[selection-start]:[&:not([data-hover])]:text-destructive-foreground data-[selection-end]:[&:not([data-hover])]:text-primary-foreground data-[selection-start]:[&:not([data-hover])]:text-primary-foreground',
													date.compare(now) === 0 &&
														'after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selection-end]:[&:not([data-hover])]:after:bg-background data-[selection-start]:[&:not([data-hover])]:after:bg-background'
												)}
											>
												<DateRangePicker.Day
													class={cn(
														'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground ring-offset-background duration-150 [transition-property:border-radius,box-shadow]',
														'data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none',
														'data-[highlighted]:bg-accent data-[selected]:bg-accent',
														'data-[selection-end]:bg-primary data-[selection-start]:bg-primary',
														'data-[selection-end]:text-primary-foreground data-[selection-start]:text-primary-foreground',
														'data-[highlighted]:rounded-none data-[selection-end]:rounded-e-lg data-[selection-start]:rounded-s-lg',
														'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2'
													)}
												>
													{date.day}
												</DateRangePicker.Day>
											</DateRangePicker.Cell>
										{/each}
									</DateRangePicker.GridRow>
								{/each}
							</DateRangePicker.GridBody>
						</DateRangePicker.Grid>
					{/each}
				</div>
			{/snippet}
		</DateRangePicker.Calendar>
	</DateRangePicker.Content>
	<p class="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
		Built with
		<a
			class="underline hover:text-foreground"
			href="https://next.bits-ui.com/docs/components/date-range-picker"
			target="_blank"
			rel="noopener nofollow"
		>
			Bits UI
		</a>
	</p>
</DateRangePicker.Root>
