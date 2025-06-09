import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

// =========================================
// Constants and Configuration
// =========================================

const CONSTANTS = {
	COMPONENT_STATES: {
		READY: 'ready',
		TODO: 'todo'
	},
	FILE_EXTENSIONS: {
		SVELTE: '.svelte'
	},
	PREFIX: 'OUI'
} as const;

interface ComponentConfig {
	dirs: {
		/** Root directory containing all component directories */
		component: string;
		/** Directories to exclude from processing */
		exclude: string[];
		object: {
			/** Output path for the components registry object */
			output: string;
		};
		types: {
			/** Output path for the TypeScript type definitions */
			output: string;
		};
	};
	files: {
		/** Files to exclude from component processing */
		exclude: string[];
	};
	validation?: {
		/** Whether to enforce component naming conventions */
		enforceNaming?: boolean;
		/** Pattern that component names must match */
		namingPattern?: RegExp;
	};
}

const CONFIG: ComponentConfig = {
	dirs: {
		component: path.join(process.cwd(), 'src', 'lib', 'components'),
		exclude: ['ui', '.', 'index.svelte', '_extras'],
		object: {
			output: path.join(process.cwd(), 'src', 'lib', 'componentRegistry.components.ts')
		},
		types: {
			output: path.join(process.cwd(), 'src', 'lib', 'componentRegistry.types.ts')
		}
	},
	files: {
		exclude: ['index.svelte', '.DS_Store']
	},
	validation: {
		enforceNaming: true,
		namingPattern: /^[a-z]+-\d+$/
	}
} as const;

// =========================================
// Types
// =========================================

interface ComponentDirectory {
	readonly componentCount: number;
	readonly dir: string;
	readonly files: string[];
	readonly firstFile: string;
	readonly status: ComponentStatus;
}

interface ComponentStats {
	directorySizes: Map<string, number>;
	largestDirectory: DirectoryStats;
	smallestDirectory: DirectoryStats;
	status: ComponentStatus;
	totalComponents: number;
	totalDirectories: number;
}

interface ComponentStatus {
	ready: number;
	todo: number;
}

interface DirectoryStats {
	count: number;
	name: string;
}

interface GeneratedTypes {
	readonly componentHelperName: string;
	readonly componentTypeName: string;
	readonly directoryHelperName: string;
	readonly directoryToComponentName: string;
	readonly directoryTypeName: string;
	readonly objectName: string;
	readonly objectTypeName: string;
}

// Type name constants
const TYPES: GeneratedTypes = {
	componentHelperName: `${CONSTANTS.PREFIX}ComponentHelper`,
	componentTypeName: `${CONSTANTS.PREFIX}Component`,
	directoryHelperName: `${CONSTANTS.PREFIX}DirectoryHelper`,
	directoryToComponentName: `${CONSTANTS.PREFIX}DirectoryToComponent`,
	directoryTypeName: `${CONSTANTS.PREFIX}Directory`,
	objectName: `${CONSTANTS.PREFIX}_DIRECTORIES`,
	objectTypeName: `${CONSTANTS.PREFIX}Directories`
} as const;

// =========================================
// Component Registry Generator
// =========================================

class ComponentRegistryGenerator {
	#dirComponentSet = new Set<ComponentDirectory>();
	#errors: string[] = [];
	#startTime: number = 0;

	// Initialize stats with default values
	#stats: ComponentStats = {
		directorySizes: new Map<string, number>(),
		largestDirectory: {
			count: 0,
			name: ''
		},
		smallestDirectory: {
			count: Infinity,
			name: ''
		},
		status: {
			ready: 0,
			todo: 0
		},
		totalComponents: 0,
		totalDirectories: 0
	};

	// =========================================
	// Statistics Management
	// =========================================

	#updateStats(directory: ComponentDirectory): void {
		// Update component counts
		this.#stats.totalComponents += directory.componentCount;
		this.#stats.directorySizes.set(directory.dir, directory.componentCount);

		// Update status counts
		this.#stats.status.ready += directory.status.ready;
		this.#stats.status.todo += directory.status.todo;

		// Update directory size records
		if (directory.componentCount > this.#stats.largestDirectory.count) {
			this.#stats.largestDirectory = {
				count: directory.componentCount,
				name: directory.dir
			};
		}
		if (directory.componentCount < this.#stats.smallestDirectory.count) {
			this.#stats.smallestDirectory = {
				count: directory.componentCount,
				name: directory.dir
			};
		}
	}

	#logStatistics(): void {
		const totalTime = Math.round(performance.now() - this.#startTime);
		const readyPercentage = (
			(this.#stats.status.ready / this.#stats.totalComponents) *
			100
		).toFixed(1);

		const todoPercentage = ((this.#stats.status.todo / this.#stats.totalComponents) * 100).toFixed(
			1
		);

		console.info('\n Component Registry Statistics:');
		console.info('--------------------------------');
		console.info(`📁 Total Directories: ${this.#stats.totalDirectories}`);
		console.info(`📦 Total Components: ${this.#stats.totalComponents}`);

		console.info('\n📈 Component Status:');
		console.info(`   ✅ Ready: ${this.#stats.status.ready} (${readyPercentage}%)`);
		console.info(`   📝 Todo: ${this.#stats.status.todo} (${todoPercentage}%)`);

		console.info('\n📊 Directory Insights:');
		console.info(
			`   📈 Largest: ${this.#stats.largestDirectory.name} (${this.#stats.largestDirectory.count} components)`
		);
		console.info(
			`   📉 Smallest: ${this.#stats.smallestDirectory.name} (${this.#stats.smallestDirectory.count} components)`
		);

		if (this.#errors.length) {
			console.warn('\n⚠️  Warnings:');
			this.#errors.forEach((error) => console.warn(`   - ${error}`));
			console.info(`\n   Found ${this.#errors.length} warnings during generation`);
		} else {
			console.info('\n✅ No warnings found during generation');
		}

		console.info('\n⚡ Performance:');
		console.info(`   🕒 Generation Time: ${totalTime}ms`);
	}

	// =========================================
	// Component Validation
	// =========================================

	async #getValidDirectories(): Promise<string[]> {
		try {
			const entries = await fs.readdir(CONFIG.dirs.component);
			const validDirs = await Promise.all(
				entries.map(async (dir) => {
					try {
						const stats = await fs.stat(path.join(CONFIG.dirs.component, dir));
						return stats.isDirectory() && !CONFIG.dirs.exclude.includes(dir) ? dir : null;
					} catch {
						this.#errors.push(`Failed to read directory: ${dir}`);
						return null;
					}
				})
			);
			return validDirs.filter(Boolean) as string[];
		} catch (error) {
			throw new Error(`Failed to read component directory: ${error}`);
		}
	}

	#validateComponentName(file: string): boolean {
		if (!CONFIG.validation?.enforceNaming) return true;

		const baseName = path
			.basename(file, CONSTANTS.FILE_EXTENSIONS.SVELTE)
			.replace(`.${CONSTANTS.COMPONENT_STATES.TODO}`, '');

		return CONFIG.validation.namingPattern?.test(baseName) ?? true;
	}

	#getComponentStatus(files: string[]): ComponentStatus {
		return files.reduce(
			(acc, file) => {
				if (file.includes(CONSTANTS.COMPONENT_STATES.TODO)) {
					acc.todo++;
				} else {
					acc.ready++;
				}
				return acc;
			},
			{ ready: 0, todo: 0 }
		);
	}

	async #validateDirectoryComponents(dir: string): Promise<void> {
		try {
			const files = await fs.readdir(path.join(CONFIG.dirs.component, dir));
			const svelteFiles = files
				.filter((file) => {
					const isValid =
						!CONFIG.files.exclude.includes(file) &&
						(file.endsWith(CONSTANTS.FILE_EXTENSIONS.SVELTE) ||
							file.endsWith(
								`${CONSTANTS.COMPONENT_STATES.TODO}${CONSTANTS.FILE_EXTENSIONS.SVELTE}`
							));

					if (isValid && !this.#validateComponentName(file)) {
						this.#errors.push(`Invalid component name: ${file} in directory ${dir}`);
						return false;
					}
					return isValid;
				})
				.sort();

			if (!svelteFiles.length) {
				throw new Error(`Directory "${dir}" does not contain any .svelte files`);
			}

			const directoryInfo: ComponentDirectory = {
				componentCount: svelteFiles.length,
				dir,
				files: svelteFiles,
				firstFile: svelteFiles[0].split('-')[0],
				status: this.#getComponentStatus(svelteFiles)
			};

			this.#dirComponentSet.add(directoryInfo);
			this.#updateStats(directoryInfo);
		} catch (error) {
			throw new Error(`Failed to validate directory ${dir}: ${error}`);
		}
	}

	// =========================================
	// File Generation
	// =========================================

	#fileHeader(): string {
		const version = process.env.npm_package_version ?? '0.0.1';
		const timestamp = new Date().toLocaleString();
		return `
/* eslint-disable */
/**
 * !!!!!!!!!!
 * This file is auto-generated. Do not edit manually
 * Last generated at: ${timestamp}
 * To update, run: pnpm generate:registry --format
 * @version ${version}
 * !!!!!!!!!!
 */
`;
	}

	async #getComponents(): Promise<ComponentDirectory[]> {
		return Array.from(this.#dirComponentSet).sort((a, b) => a.dir.localeCompare(b.dir));
	}

	// =========================================
	// Components Object Generation
	// =========================================

	async #generateComponentsObject(): Promise<string> {
		const components = await this.#getComponents();

		function directoryObject() {
			let output = `export const ${TYPES.objectName} = {`;
			components.forEach(({ dir, files, status }) => {
				output += `
  '${dir.toUpperCase()}': {
    directory: '${dir}',
    name: '${dir.charAt(0).toUpperCase()}${dir.slice(1)}',
    components: [${files
			.sort()
			.map((f) => `'${f}'`)
			.join(', ')}],
    status: {
      todo: ${status.todo},
      ready: ${status.ready}
    }
  },`;
			});
			return `${output}\n} as const;`;
		}

		return directoryObject();
	}

	async #generateComponentsObjectFile(): Promise<string> {
		const componentsObject = await this.#generateComponentsObject();
		const componentsObjectType = `\nexport type ${TYPES.objectTypeName} = typeof ${TYPES.objectName};`;
		const componentStates = `
export const COMPONENT_STATES = {
	TODO: '${CONSTANTS.COMPONENT_STATES.TODO}',
	READY: '${CONSTANTS.COMPONENT_STATES.READY}'
} as const;

export type ComponentState = (typeof COMPONENT_STATES)[keyof typeof COMPONENT_STATES];`;
		return `${this.#fileHeader()}${componentsObject}${componentsObjectType}${componentStates}`;
	}

	// =========================================
	// Type Definition Generation
	// =========================================

	async #generateTypeDefinitions(): Promise<string> {
		const components = await this.#getComponents();

		function generateDirName(dir: string): string {
			const formattedDir = dir.replace(/[^a-zA-Z]/g, '');
			return `${CONSTANTS.PREFIX}${formattedDir.charAt(0).toUpperCase()}${formattedDir.slice(1)}`;
		}

		function generateComponentTypeHelper(): string {
			return `export type ${TYPES.componentHelperName}<T extends keyof ${TYPES.objectTypeName}> = ${TYPES.objectTypeName}[T]['components'][number];`;
		}

		function generateDirectoryTypeHelper(): string {
			return `export type ${TYPES.directoryHelperName}<T extends keyof ${TYPES.objectTypeName}> = ${TYPES.objectTypeName}[T]['directory'];`;
		}

		function generateReadyComponentHelpers(): string {
			return `
// Ready Component Helpers
export type OUIReadyComponent<T extends keyof ${TYPES.objectTypeName}> = Exclude<
  ${TYPES.objectTypeName}[T]['components'][number],
  \`\${string}${CONSTANTS.COMPONENT_STATES.TODO}${CONSTANTS.FILE_EXTENSIONS.SVELTE}\`
>;

// Get all ready components
export type OUIReadyComponents = {
  [K in keyof ${TYPES.objectTypeName}]: OUIReadyComponent<K>
}[keyof ${TYPES.objectTypeName}];

// Get ready components by directory
export type OUIDirectoryReadyComponents = {
  [K in keyof ${TYPES.objectTypeName}]: {
    directory: K;
    components: OUIReadyComponent<K>[];
  }
};`;
		}

		function generateComponentCountTypes(): string {
			return `
// Component Count Types
export type OUIDirectoryComponentCounts = {
  [K in keyof ${TYPES.objectTypeName}]: {
    directory: K;
    total: number;
    status: ${TYPES.objectTypeName}[K]['status'];
  }
};`;
		}

		function generateDirectoryStatusFilters(): string {
			return `
// Directory Status Filters
export type OUIDirectoriesWithTodo = {
  [K in keyof ${TYPES.objectTypeName} as ${TYPES.objectTypeName}[K]['status']['todo'] extends 0 ? never : K]: ${TYPES.objectTypeName}[K]
};`;
		}

		function generateComponentMetadata(): string {
			return `
// Component Metadata
export type OUIComponentMetadata = {
  [K in keyof ${TYPES.objectTypeName}]: {
    directory: K;
    name: ${TYPES.objectTypeName}[K]['name'];
    totalComponents: number;
    status: ${TYPES.objectTypeName}[K]['status'];
    hasInProgress: boolean;
  }
};`;
		}

		function generateStatusTypeHelpers(): string {
			return `
// Status Type Helpers
export type OUITodoComponent<T extends keyof ${TYPES.objectTypeName}> = Extract<${TYPES.objectTypeName}[T]['components'][number], \`\${string}${CONSTANTS.COMPONENT_STATES.TODO}${CONSTANTS.FILE_EXTENSIONS.SVELTE}\`>;

// Get all todo components
export type OUITodoComponents = {
  [K in keyof ${TYPES.objectTypeName}]: OUITodoComponent<K>
}[keyof ${TYPES.objectTypeName}];

// Get todo components by directory
export type OUIDirectoryTodoComponents = {
  [K in keyof ${TYPES.objectTypeName}]: {
    directory: K;
    components: OUITodoComponent<K>[];
  }
};`;
		}

		function componentTypes(): string {
			return components
				.map(
					({ dir }) =>
						`export type ${generateDirName(dir)}Components = ${TYPES.componentHelperName}<'${dir.toUpperCase()}'>;`
				)
				.join('\n');
		}

		function allComponentTypes(): string {
			const types = components.map(({ dir }) => `${generateDirName(dir)}Components`).join(' | ');
			return `export type ${TYPES.componentTypeName} = Prettify<${types}>;`;
		}

		function directoryType(): string {
			return `export type ${TYPES.directoryTypeName} = ${TYPES.directoryHelperName}<keyof ${TYPES.objectTypeName}>;`;
		}

		function directoryToComponent(): string {
			const mappings = components
				.map(({ dir }) => `  '${dir}': ${generateDirName(dir)}Components;`)
				.join('\n');
			return `export type ${TYPES.directoryToComponentName} = Prettify<{\n${mappings}\n}>;`;
		}

		return `
${this.#fileHeader()}
import type { Prettify } from '$lib/types/helpers';
import type { ${TYPES.objectTypeName} } from './componentRegistry.components';

// Directory Type
${directoryType()}

// Helpers
${generateDirectoryTypeHelper()}
${generateComponentTypeHelper()}

// Status Helpers
${generateStatusTypeHelpers()}
${generateReadyComponentHelpers()}
${generateComponentCountTypes()}
${generateDirectoryStatusFilters()}
${generateComponentMetadata()}

// Component Types
${componentTypes()}

// All Component Types
${allComponentTypes()}

// Directory To Component
${directoryToComponent()}
`;
	}

	// =========================================
	// File Formatting
	// =========================================

	async #formatFiles(): Promise<void> {
		if (process.argv.includes('--format')) {
			await Promise.all([
				exec(`prettier --write ${CONFIG.dirs.object.output}`),
				exec(`prettier --write ${CONFIG.dirs.types.output}`)
			]);
		}
	}

	// =========================================
	// Main Generation Process
	// =========================================

	async generate(): Promise<void> {
		this.#startTime = performance.now();
		try {
			const directories = await this.#getValidDirectories();
			this.#stats.totalDirectories = directories.length;

			await Promise.all(directories.map((dir) => this.#validateDirectoryComponents(dir)));

			const [componentsObject, typesContent] = await Promise.all([
				this.#generateComponentsObjectFile(),
				this.#generateTypeDefinitions()
			]);

			await Promise.all([
				fs.writeFile(CONFIG.dirs.object.output, componentsObject),
				fs.writeFile(CONFIG.dirs.types.output, typesContent)
			]);

			await this.#formatFiles();
			this.#logStatistics();
		} catch (error) {
			console.error('Failed to generate component types:', error);
			process.exit(1);
		}
	}
}

// =========================================
// Run Generator
// =========================================

new ComponentRegistryGenerator().generate();
