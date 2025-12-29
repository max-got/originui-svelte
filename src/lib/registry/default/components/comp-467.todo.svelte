<script lang="ts">
	import Avatar40_01 from '$lib/assets/avatar-40-01.jpg?enhanced';
	import Avatar40_02 from '$lib/assets/avatar-40-02.jpg?enhanced';
	import Avatar40_03 from '$lib/assets/avatar-40-03.jpg?enhanced';
	import Avatar40_05 from '$lib/assets/avatar-40-05.jpg?enhanced';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/registry/default/ui/table';
	const items = [
		{
			balance: '$1,250.00',
			email: 'alex.t@company.com',
			id: '1',
			image: Avatar40_02,
			location: 'San Francisco, US',
			name: 'Alex Thompson',
			status: 'Active',
			username: '@alexthompson'
		},
		{
			balance: '$600.00',
			email: 'sarah.c@company.com',
			id: '2',
			image: Avatar40_01,
			location: 'Singapore',
			name: 'Sarah Chen',
			status: 'Active',
			username: '@sarahchen'
		},
		{
			balance: '$0.00',
			email: 'm.garcia@company.com',
			id: '4',
			image: Avatar40_03,
			location: 'Madrid, Spain',
			name: 'Maria Garcia',
			status: 'Active',
			username: '@mariagarcia'
		},
		{
			balance: '-$1,000.00',
			email: 'd.kim@company.com',
			id: '5',
			image: Avatar40_05,
			location: 'Seoul, KR',
			name: 'David Kim',
			status: 'Active',
			username: '@davidkim'
		}
	];
</script>

<div>
	<Table>
		<TableHeader>
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
					<TableCell>
						<div class="flex items-center gap-3">
							<enhanced:img class="size-10 rounded-full" src={item.image} alt={item.name} />
							<div>
								<div class="font-medium">{item.name}</div>
								<span class="text-muted-foreground mt-0.5 text-xs">
									{item.username}
								</span>
							</div>
						</div>
					</TableCell>
					<TableCell>{item.email}</TableCell>
					<TableCell>{item.location}</TableCell>
					<TableCell>{item.status}</TableCell>
					<TableCell class="text-right">{item.balance}</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	<p class="text-muted-foreground mt-4 text-center text-sm">Table with images</p>
</div>
