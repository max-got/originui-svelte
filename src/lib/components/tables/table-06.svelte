<script lang="ts">
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';

	const programmingLanguages = [
		{
			id: '1',
			name: 'JavaScript',
			releaseYear: '1995',
			developer: 'Brendan Eich',
			typing: 'Dynamic',
			paradigm: 'Multi-paradigm',
			extension: '.js',
			latestVersion: 'ES2021',
			popularity: 'High'
		},
		{
			id: '2',
			name: 'Python',
			releaseYear: '1991',
			developer: 'Guido van Rossum',
			typing: 'Dynamic',
			paradigm: 'Multi-paradigm',
			extension: '.py',
			latestVersion: '3.10',
			popularity: 'High'
		},
		{
			id: '3',
			name: 'Java',
			releaseYear: '1995',
			developer: 'James Gosling',
			typing: 'Static',
			paradigm: 'Object-oriented',
			extension: '.java',
			latestVersion: '17',
			popularity: 'High'
		},
		{
			id: '4',
			name: 'C++',
			releaseYear: '1985',
			developer: 'Bjarne Stroustrup',
			typing: 'Static',
			paradigm: 'Multi-paradigm',
			extension: '.cpp',
			latestVersion: 'C++20',
			popularity: 'High'
		},
		{
			id: '5',
			name: 'Ruby',
			releaseYear: '1995',
			developer: 'Yukihiro Matsumoto',
			typing: 'Dynamic',
			paradigm: 'Multi-paradigm',
			extension: '.rb',
			latestVersion: '3.0',
			popularity: 'Low'
		}
	];
</script>

<div>
	<div class="overflow-hidden rounded-md border bg-background">
		<Table>
			<TableHeader>
				<TableRow class="bg-muted/50">
					<TableHead class="h-9 py-2">Name</TableHead>
					<TableHead class="h-9 py-2">Release Year</TableHead>
					<TableHead class="h-9 py-2">Developer</TableHead>
					<TableHead class="h-9 py-2">Typing</TableHead>
					<TableHead class="h-9 py-2">Paradigm</TableHead>
					<TableHead class="h-9 py-2">Extension</TableHead>
					<TableHead class="h-9 py-2">Latest Version</TableHead>
					<TableHead class="h-9 py-2">Popularity</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each programmingLanguages as language (language.id)}
					<TableRow>
						<TableCell class="py-2 font-medium">
							{language.name}
						</TableCell>
						<TableCell class="py-2">{language.releaseYear}</TableCell>
						<TableCell class="py-2">{language.developer}</TableCell>
						<TableCell class="py-2">{language.typing}</TableCell>
						<TableCell class="py-2">{language.paradigm}</TableCell>
						<TableCell class="py-2">{language.extension}</TableCell>
						<TableCell class="py-2">{language.latestVersion}</TableCell>
						<TableCell class="py-2">{language.popularity}</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<p class="mt-4 text-center text-sm text-muted-foreground">Dense table</p>
</div>
