export const ENHANCED_IMAGE_REGEX = /<enhanced:img/;

export const POSSIBLE_DEPENDENCIES = [
	{
		dev: false,
		name: 'bits-ui',
		packageName: 'bits-ui@next',
		url: 'https://github.com/huntabyte/bits-ui'
	},
	{
		dev: false,
		name: 'lucide-svelte',
		packageName: 'lucide-svelte',
		url: 'https://github.com/lucide-icons/lucide'
	},
	{
		dev: true,
		name: '~icons/ri',
		packageName: '@iconify-json/ri',
		url: 'https://www.npmjs.com/package/@iconify-json/ri'
	},
	{
		dev: true,
		name: '~icons/ri',
		packageName: 'unplugin-icons',
		url: 'https://github.com/antfu/unplugin-icons'
	},
	{
		dev: false,
		name: '@internationalized/date',
		packageName: '@internationalized/date',
		url: 'https://github.com/adobe/react-spectrum/tree/main/packages/@internationalized/date'
	},
	{
		dev: false,
		name: 'inputmask',
		packageName: 'inputmask',
		url: 'https://github.com/RobinHerbots/Inputmask'
	}
] as const;

export type PossibleDependency = (typeof POSSIBLE_DEPENDENCIES)[number];
