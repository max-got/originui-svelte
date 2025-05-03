<script lang="ts">
	import {
		Table,
		TableBody,
		TableCell,
		TableFooter,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';

	const items = [
		{
			id: '1',
			name: 'Alex Thompson',
			email: 'alex.t@company.com',
			location: 'San Francisco, US',
			status: 'Active',
			balance: '$1,250.00'
		},
		{
			id: '2',
			name: 'Sarah Chen',
			email: 'sarah.c@company.com',
			location: 'Singapore',
			status: 'Active',
			balance: '$600.00'
		},
		{
			id: '3',
			name: 'James Wilson',
			email: 'j.wilson@company.com',
			location: 'London, UK',
			status: 'Inactive',
			balance: '$650.00'
		},
		{
			id: '4',
			name: 'Maria Garcia',
			email: 'm.garcia@company.com',
			location: 'Madrid, Spain',
			status: 'Active',
			balance: '$0.00'
		},
		{
			id: '5',
			name: 'David Kim',
			email: 'd.kim@company.com',
			location: 'Seoul, KR',
			status: 'Active',
			balance: '-$1,000.00'
		},
		{
			id: '6',
			name: 'John Brown',
			email: 'john.brown@company.com',
			location: 'New York, US',
			status: 'Active',
			balance: '$1,500.00'
		},
		{
			id: '7',
			name: 'Jane Doe',
			email: 'jane.doe@company.com',
			location: 'Paris, FR',
			status: 'Inactive',
			balance: '$200.00'
		},
		{
			id: '8',
			name: 'Peter Smith',
			email: 'peter.smith@company.com',
			location: 'Berlin, DE',
			status: 'Active',
			balance: '$1,000.00'
		},
		{
			id: '9',
			name: 'Olivia Lee',
			email: 'olivia.lee@company.com',
			location: 'Tokyo, JP',
			status: 'Active',
			balance: '$500.00'
		},
		{
			id: '10',
			name: 'Liam Chen',
			email: 'liam.chen@company.com',
			location: 'Shanghai, CN',
			status: 'Inactive',
			balance: '$300.00'
		},
		{
			id: '11',
			name: 'Ethan Kim',
			email: 'ethan.kim@company.com',
			location: 'Busan, KR',
			status: 'Active',
			balance: '$800.00'
		},
		{
			id: '12',
			name: 'Ava Brown',
			email: 'ava.brown@company.com',
			location: 'London, UK',
			status: 'Active',
			balance: '$1,200.00'
		},
		{
			id: '13',
			name: 'Lily Lee',
			email: 'lily.lee@company.com',
			location: 'Seoul, KR',
			status: 'Active',
			balance: '$400.00'
		},
		{
			id: '14',
			name: 'Noah Smith',
			email: 'noah.smith@company.com',
			location: 'New York, US',
			status: 'Inactive',
			balance: '$600.00'
		},
		{
			id: '15',
			name: 'Eve Chen',
			email: 'eve.chen@company.com',
			location: 'Taipei, TW',
			status: 'Active',
			balance: '$1,800.00'
		}
	];
</script>

<div>
	<div class="[&>div]:max-h-96">
		<Table
			class="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none"
		>
			<TableHeader class="backdrop-blur-xs sticky top-0 z-10 bg-background/90">
				<TableRow class="hover:bg-transparent">
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Location</TableHead>
					<TableHead>Status</TableHead>
					<TableHead class="text-right">Balance</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each items as item (item.id)}
					<TableRow>
						<TableCell class="font-medium">{item.name}</TableCell>
						<TableCell>{item.email}</TableCell>
						<TableCell>{item.location}</TableCell>
						<TableCell>{item.status}</TableCell>
						<TableCell class="text-right">{item.balance}</TableCell>
					</TableRow>
				{/each}
			</TableBody>
			<TableFooter class="bg-transparent">
				<TableRow class="hover:bg-transparent">
					<TableCell colspan={4}>Total</TableCell>
					<TableCell class="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	</div>
	<p class="mt-8 text-center text-sm text-muted-foreground">Table with sticky header</p>
</div>
