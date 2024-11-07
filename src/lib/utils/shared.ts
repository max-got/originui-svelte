const COLLAPSIBLE_START_REGEX =
	/\s+(?:\/\/|\/\*|<!--|[#"']|--|%{1,2}|;{1,2})\s+\[!code collapse-start\]\s*(?:(?:\*\/|-->)\s*)?$/;
const COLLAPSIBLE_END_REGEX =
	/\s+(?:\/\/|\/\*|<!--|[#"']|--|%{1,2}|;{1,2})\s+\[!code collapse-end\]\s*(?:(?:\*\/|-->)\s*)?$/;

const IMPORTS_REGEX =
	/(?<=(?:import|export)[^`'"]*from\s+[`'"])(?<path1>[^`'"]+)(?=[`'"])|(?:import|export)(?:\s+|\s*\(\s*)[`'"](?<path2>[|'"`])/g;

const ENHANCED_IMAGE_REGEX = /<enhanced:img/;
const POSSIBLE_DEPENDENCIES = [
	{
		dev: false,
		name: 'bits-ui',
		packageName: 'bits-ui@next'
	},
	{
		dev: false,
		name: 'lucide-svelte',
		packageName: 'lucide-svelte'
	},
	{
		dev: true,
		name: '~icons/ri',
		packageName: 'unplugin-icons @iconify-json/ri'
	},
	{
		dev: false,
		name: '@internationalized/date',
		packageName: '@internationalized/date'
	},
	{
		dev: false,
		name: 'inputmask',
		packageName: 'inputmask'
	}
] as const;

export {
	COLLAPSIBLE_END_REGEX,
	COLLAPSIBLE_START_REGEX,
	ENHANCED_IMAGE_REGEX,
	IMPORTS_REGEX,
	POSSIBLE_DEPENDENCIES
};
