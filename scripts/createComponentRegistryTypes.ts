import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

type ComponentConfig = {
	readonly dirs: {
		readonly component: string;
		readonly exclude: readonly string[];
		readonly output: string;
	};
	readonly files: {
		readonly exclude: readonly string[];
	};
};

type ComponentDirectory = {
	readonly componentCount: number;
	readonly dir: string;
	readonly files: string[];
	readonly firstFile: string;
};

const CONFIG: ComponentConfig = {
	dirs: {
		component: path.join(process.cwd(), 'src', 'lib', 'components'),
		exclude: ['ui', '.', 'index.svelte'],
		output: path.join(process.cwd(), 'src', 'lib', 'componentRegistry.types.ts')
	},
	files: {
		exclude: ['index.svelte', '.DS_Store']
	}
} as const;

class ComponentRegistryGenerator {
	#dirComponentSet = new Set<ComponentDirectory>();

	async #getValidDirectories(): Promise<string[]> {
		const entries = await fs.readdir(CONFIG.dirs.component);
		const validDirs = await Promise.all(
			entries.map(async (dir) => {
				const stats = await fs.stat(path.join(CONFIG.dirs.component, dir)).catch(() => null);
				return stats?.isDirectory() && !CONFIG.dirs.exclude.includes(dir) ? dir : null;
			})
		);
		return validDirs.filter(Boolean) as string[];
	}

	async #validateDirectoryComponents(dir: string): Promise<void> {
		const files = await fs.readdir(path.join(CONFIG.dirs.component, dir));
		const svelteFiles = files
			.filter((file) => !CONFIG.files.exclude.includes(file) && file.endsWith('.svelte'))
			.sort();

		if (!svelteFiles.length) {
			throw new Error(`Directory "${dir}" does not contain any .svelte files`);
		}

		this.#dirComponentSet.add({
			componentCount: svelteFiles.length,
			dir,
			files: svelteFiles,
			firstFile: svelteFiles[0].split('-')[0]
		});
	}

	async #generateTypeDefinitions(): Promise<string> {
		const GENERATED_TYPE_PREFIX = 'OUI' as const;
		const COMPONENT_DIRECTORY_OBJECT_NAME = `${GENERATED_TYPE_PREFIX}_DIRECTORIES` as const;
		const COMPONENT_TYPE_NAME = `${GENERATED_TYPE_PREFIX}Component` as const;
		const DIRECTORY_TYPE_NAME = `${GENERATED_TYPE_PREFIX}Directory` as const;
		const DIRECTORY_TO_COMPONENT_NAME = `${GENERATED_TYPE_PREFIX}DirectoryToComponent` as const;

		const timestamp = new Date().toLocaleString();
		const version = process.env.npm_package_version ?? 'unknown';
		const components = Array.from(this.#dirComponentSet).sort((a, b) => a.dir.localeCompare(b.dir));

		function generateDirName(dir: string) {
			const formattedDir = dir.replace(/[^a-zA-Z]/g, '');
			return `${GENERATED_TYPE_PREFIX}${formattedDir.charAt(0).toUpperCase()}${formattedDir.slice(1)}`;
		}

		function directoryObject() {
			let output = `export const ${COMPONENT_DIRECTORY_OBJECT_NAME} = {`;
			components.forEach(({ dir, files }) => {
				output += `'${dir.toUpperCase()}': {
					directory: '${dir}',
					components: [${files
						.sort()
						.map((f) => `'${f}'`)
						.join(', ')}]
				},`;
			});
			return `${output}} as const;`;
		}

		function componentTypes() {
			let output = '';
			components.forEach(({ dir }) => {
				output += `export type ${generateDirName(dir)}Components = (typeof ${COMPONENT_DIRECTORY_OBJECT_NAME}['${dir.toUpperCase()}']['components'])[number];`;
			});
			return output;
		}

		function allComponentTypes() {
			let output = `export type ${COMPONENT_TYPE_NAME} = Prettify<`;
			components.forEach(({ dir }) => {
				output += `${generateDirName(dir)}Components | `;
			});
			return `${output.slice(0, -3)}>`;
		}

		function directoryType() {
			const output = `export type ${DIRECTORY_TYPE_NAME} = typeof ${COMPONENT_DIRECTORY_OBJECT_NAME}[keyof typeof ${COMPONENT_DIRECTORY_OBJECT_NAME}]['directory'];`;
			return output;
		}

		function directoryToComponent() {
			let output = `export interface ${DIRECTORY_TO_COMPONENT_NAME} {`;
			components.forEach(({ dir }) => {
				output += `  '${dir}': ${generateDirName(dir)}Components;`;
			});
			return `${output}}`;
		}

		return `
/* eslint-disable */
/**
 * !!!!!!!!!!
 * This file is auto-generated. Do not edit manually
 * Last generated at: ${timestamp}
 * @version ${version}
 * !!!!!!!!!!
 */

import type { Prettify } from '$lib/types/helpers';

${directoryObject()}
${directoryType()}

${componentTypes()}

${allComponentTypes()}

${directoryToComponent()}
`;
	}

	async generate(): Promise<void> {
		const startTime = performance.now();
		try {
			const directories = await this.#getValidDirectories();
			await Promise.all(directories.map((dir) => this.#validateDirectoryComponents(dir)));

			const typesContent = await this.#generateTypeDefinitions();
			await fs.writeFile(CONFIG.dirs.output, typesContent);

			if (process.argv.includes('--format')) {
				exec(`prettier --write ${CONFIG.dirs.output}`);
			}

			const timeTaken = Math.round(performance.now() - startTime);

			console.info(`Component types generated successfully in ${timeTaken}ms`);
		} catch (error) {
			console.error('Failed to generate component types:', error as Error);
			process.exit(1);
		}
	}
}

new ComponentRegistryGenerator().generate();
