<script lang="ts">
	import {
		Timeline,
		TimelineDate,
		TimelineHeader,
		TimelineIndicator,
		TimelineItem,
		TimelineSeparator,
		TimelineTitle
	} from '$lib/components/ui/timeline';

	const items = [
		{
			date: 'Mar 15, 2024',
			id: 1,
			title: 'Project Kickoff'
		},
		{
			date: 'Mar 22, 2024',
			id: 2,
			title: 'Design Phase'
		},
		{
			date: 'Apr 5, 2024',
			id: 3,
			title: 'Development Sprint'
		},
		{
			date: 'Apr 19, 2024',
			id: 4,
			title: 'Testing & Deployment'
		},
		{
			date: 'May 3, 2024',
			id: 5,
			title: 'User Training'
		},
		{
			date: 'May 17, 2024',
			id: 6,
			title: 'Project Handover'
		}
	];
</script>

<Timeline defaultValue={3}>
	{#each items as item (item.id)}
		<TimelineItem
			step={item.id}
			class={[
				'w-[calc(50%-1.5rem)]',
				'group-data-[orientation=vertical]/timeline:odd:ms-auto',
				'group-data-[orientation=vertical]/timeline:even:text-right',
				'group-data-[orientation=vertical]/timeline:even:ml-0',
				'group-data-[orientation=vertical]/timeline:even:mr-8',
				'group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:even:-right-6',
				'group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:even:left-auto',
				'group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:even:translate-x-1/2',
				'group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:even:-right-6',
				'group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:even:left-auto',
				'group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:even:translate-x-1/2'
			]}
		>
			<TimelineHeader>
				<TimelineSeparator />
				<TimelineDate>{item.date}</TimelineDate>
				<TimelineTitle>{item.title}</TimelineTitle>
				<TimelineIndicator />
			</TimelineHeader>
		</TimelineItem>
	{/each}
</Timeline>
