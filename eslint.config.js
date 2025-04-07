import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	perfectionist.configs['recommended-natural'],

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			],
			'no-console': ['error', { allow: ['warn', 'error', 'info'] }]
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'vite.config.*']
	},
	{
		rules: {
			'perfectionist/sort-classes': 'off',
			'perfectionist/sort-imports': [
				'error',
				{
					customGroups: {
						type: {
							/**
							 * Match all virtual types
							 * @example
							 * ```ts
							 * import type { PageServerLoad } from './$types.js';
							 * ```
							 */
							'svelte-internal': ['.\\/\\$types']
						},
						value: {
							/**
							 * Match all alias imports that end with .svelte
							 * @example
							 * ```ts
							 * import Component from '$lib/component.svelte';
							 * ```
							 */
							'alias-imports': ['^\\$?.*(\\.js|\\.ts|\\.svelte)$']
						}
					},
					groups: [
						'svelte-internal',
						'type',
						['alias-imports'],
						['builtin', 'external'],
						'internal-type',
						'internal',
						['parent-type', 'sibling-type', 'index-type'],
						['parent', 'sibling', 'index'],
						'object',

						'unknown'
					],
					matcher: 'regex'
				}
			],
			'perfectionist/sort-intersection-types': 'off',
			'perfectionist/sort-objects': [
				'error',
				{
					type: 'natural'
				}
			]
		}
	}
);
