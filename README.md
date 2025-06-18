# Origin UI - Svelte

> [!NOTE]
> This is a fork of the original [Origin UI](https://originui.com/) project. This project is not affiliated with the original. I'm grateful for their work and have created these Svelte components copied from their design.

> [!NOTE]
> This is a work in progress. For some components the necessary libraries are coming soon (e.g. [Bits UI](https://next.bits-ui.com/docs/introduction)) or are just not available yet (e.g. [React Payment Inputs](https://github.com/medipass/react-payment-inputs)). Maybe i will add them in the future myself.

Origin UI - Svelte is a collection of copy-and-paste components for quickly building app UIs using Svelte.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Acknowledgements](#acknowledgements)
- [Differences from the original](#differences-from-the-original)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development](#development)
- [Usage](#usage)
  - [Utils](#utils)
  - [Base Components](#base-components)
  - [CSS Variables](#css-variables)
- [Contributing](#contributing)
  - [Project Structure](#project-structure)
  - [Component Registry System](#component-registry-system)
  - [Dependency Detection System](#dependency-detection-system)
  - [Component Guidelines](#component-guidelines)
  - [Pull Request Process](#pull-request-process)
- [Need Help?](#need-help)
- [Terms of Use](#terms-of-use)
- [Contact](#contact)
- [Notes](#notes)

## Demo

[originui-svelte.pages.dev/](https://originui-svelte.pages.dev/)

## Acknowledgements

- [Origin UI](https://originui.com/) - The original project that this Svelte version is copied from
- [Svelte](https://svelte.dev)
- [TailwindCSS v4](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Bits UI](https://bits-ui.com)

## Differences from the original

The Original [Origin UI](https://originui.com/) is built with Next.js. This is a built with Svelte.

- [x] [Svelte](https://svelte.dev) instead of ~~Next.js~~
- [x] [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) instead of ~~Lucide React~~
- [x] [Bits UI](https://bits-ui.com/docs/introduction) instead of ~~Radix UI~~

## Getting Started

### Prerequisites

If you want to use the components in your project, you need to setup the following:

- [Svelte](https://svelte.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Bits UI](https://bits-ui.com/docs/introduction)
- or other dependencies (see [src/lib/constants.ts](src/lib/constants.ts))

### Development

> [!NOTE]
> This project uses [pnpm](https://pnpm.io/) as package manager.

1. **Setup**

   ```bash
   git clone https://github.com/max-got/originui-svelte.git
   cd originui-svelte
   pnpm install
   ```

2. **Development**

   ```bash
   pnpm dev
   ```

   - Components are previewed at `http://localhost:5173`

3. **Code Quality**
   ```bash
   pnpm lint    # Run ESLint
   pnpm format  # Run Prettier
   ```

### Usage

You can copy and use the components in your Svelte project. Note that some components may require additional libraries - refer to the listed dependencies in the component preview.

#### Utils

In the `src/lib/utils.ts` folder you will find the common `cn` function for tailwindcss class merging.

In the `src/lib/hooks` folder you will find the common hooks.

#### Base Components

You need to copy the base components from the `src/lib/components/ui` folder to your project and adjust the imports accordingly.

#### CSS Variables

Import the CSS in your `src/lib/app.css` file (the following is based on tailwindcss):

```css
@theme inline {
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--font-sans: var(--font-sans);
	--font-mono: var(--font-mono);
	--color-ring: var(--ring);
	--color-input: var(--input);
	--color-border: var(--border);
	--color-destructive-foreground: var(--destructive-foreground);
	--color-destructive: var(--destructive);
	--color-accent-foreground: var(--accent-foreground);
	--color-accent: var(--accent);
	--color-muted-foreground: var(--muted-foreground);
	--color-muted: var(--muted);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-secondary: var(--secondary);
	--color-primary-foreground: var(--primary-foreground);
	--color-primary: var(--primary);
	--color-popover-foreground: var(--popover-foreground);
	--color-popover: var(--popover);
	--color-card-foreground: var(--card-foreground);
	--color-card: var(--card);
	--radius-sm: calc(var(--radius) - 4px);
	--radius-md: calc(var(--radius) - 2px);
	--radius-lg: var(--radius);
	--radius-xl: calc(var(--radius) + 4px);
}
:root {
	--radius: 0.625rem;
	--background: oklch(1 0 0); /* --color-white */
	--foreground: oklch(0.141 0.005 285.823); /* --color-zinc-950 */
	--card: oklch(1 0 0); /* --color-white */
	--card-foreground: oklch(0.141 0.005 285.823); /* --color-zinc-950 */
	--popover: oklch(1 0 0); /* --color-white */
	--popover-foreground: oklch(0.141 0.005 285.823); /* --color-zinc-950 */
	--primary: oklch(0.21 0.006 285.885); /* --color-zinc-900 */
	--primary-foreground: oklch(0.985 0 0); /* --color-zinc-50 */
	--secondary: oklch(0.967 0.001 286.375); /* --color-zinc-100 */
	--secondary-foreground: oklch(0.21 0.006 285.885); /* --color-zinc-900 */
	--muted: oklch(0.967 0.001 286.375); /* --color-zinc-100 */
	--muted-foreground: oklch(0.552 0.016 285.938); /* --color-zinc-500 */
	--accent: oklch(0.967 0.001 286.375); /* --color-zinc-100 */
	--accent-foreground: oklch(0.21 0.006 285.885); /* --color-zinc-900 */
	--destructive: oklch(0.637 0.237 25.331); /* --color-red-500 */
	--destructive-foreground: oklch(0.637 0.237 25.331); /* --color-red-500 */
	--border: oklch(0.92 0.004 286.32); /* --color-zinc-200 */
	--input: oklch(0.871 0.006 286.286); /* --color-zinc-300 */
	--ring: oklch(0.871 0.006 286.286); /* --color-zinc-300 */
}

.dark {
	--background: oklch(0.141 0.005 285.823); /* --color-zinc-950 */
	--foreground: oklch(0.985 0 0); /* --color-zinc-50 */
	--card: oklch(0.141 0.005 285.823); /* --color-zinc-950 */
	--card-foreground: oklch(0.985 0 0); /* --color-zinc-50 */
	--popover: oklch(0.141 0.005 285.823); /* --color-zinc-950 */
	--popover-foreground: oklch(0.985 0 0); /* --color-zinc-50 */
	--primary: oklch(0.985 0 0); /* --color-zinc-50 */
	--primary-foreground: oklch(0.21 0.006 285.885); /* --color-zinc-900 */
	--secondary: oklch(0.274 0.006 286.033); /* --color-zinc-800 */
	--secondary-foreground: oklch(0.985 0 0); /* --color-zinc-50 */
	--muted: oklch(0.21 0.006 285.885); /* --color-zinc-900 */
	--muted-foreground: oklch(0.65 0.01 286); /* 🔥 near --color-zinc-400 */
	--accent: oklch(0.21 0.006 285.885); /* --color-zinc-900 */
	--accent-foreground: oklch(0.985 0 0); /* --color-zinc-50 */
	--destructive: oklch(0.396 0.141 25.723); /* --color-red-900 */
	--destructive-foreground: oklch(0.637 0.237 25.331); /* --color-red-500 */
	--border: oklch(0.274 0.006 286.033); /* --color-zinc-800 */
	--input: oklch(0.274 0.006 286.033); /* --color-zinc-800 */
	--ring: oklch(0.442 0.017 285.786); /* --color-zinc-600 */
}
```

## Contributing

We welcome contributions to Origin UI - Svelte!

This guide will help you understand our project structure and contribution workflow.

### Project Structure

```
src/
├── lib/
│   ├── components/    							# UI Components organized by type
│   │   ├── ui/        							# Base UI components
│   │   │   ├── badge.svelte 					# one component
│   │   │   ├── button.svelte 					# one component
│   │   │   ├── accordion/ 						# needs multiple components
│   │   │   │	│── accordion-item.svelte 		# Base component Accordion Item
│   │   │   │	│── accordion-trigger.svelte	# Base component Accordion Trigger
│   │   │   │	│── ...
│   │   │   └── ...
│   │   ├── inputs/    							# Input components
│   │   │   ├── input-01.svelte
│   │   │   ├── input-02.svelte
│   │   │   └── ...
│   │   ├── buttons/  							# Button components
│   │   │   ├── button-01.svelte
│   │   │   ├── button-02.svelte
│   │   │   └── ...
│   │   └─ ...       							# Other component categories
│   ├── utils/        							# Utility functions
│   ├── types/        							# TypeScript type definitions
│   └── hooks/        							# Svelte hooks
```

### Component Registry System

The project uses an automated component registry system that connects your components to the routing system. Here's how it works:

1. **Registry Generation**

   ```bash
   pnpm generate:registry
   ```

   This script automatically:

   - Scans the `src/lib/components/` directory
   - Generates `src/lib/componentRegistry.types.ts` with component mappings
   - Updates component type definitions and directory structures

2. **Registry Architecture**

   ```
   src/
   ├── lib/
   │   ├── componentRegistry.types.ts  # Auto-generated types
   │   ├── componentRegistry.components.ts  # Auto-generated variables
   │   ├── componentRegistry.ts        # Registry implementation
   │   └── data/api/components/
   │       ├── components.ts           # API endpoints
   │       ├── components.handler.ts   # Request handlers
   │       └── components.route.ts     # Route definitions
   ├── routes/
   │   └── (components)/
   │       └── [path=componentsPath]/
   │           ├── +page.server.ts     # Dynamic route handling
   │           └── [directory]/[id]/
   │               └── +page.server.ts # Component page handling
   └── params/
       ├── componentDirectory.ts       # Directory parameter validation
       └── componentId.ts             # Component ID validation
   ```

3. **How It Works**

   - The registry system creates a type-safe mapping between:
     - Component files in your directories
     - URL routes and parameters
     - API endpoints
   - SvelteKit param matchers use these types to validate URLs
   - The system enables dynamic routing while maintaining type safety

4. **When to Run Registry Generation**
   Run `pnpm generate:registry` when you:
   - Add new component files
   - Create new component categories
   - Rename components or directories
   - Update component structure

> [!IMPORTANT]
> Always run `pnpm generate:registry` after making changes to component files or structure. This ensures the routing system stays in sync with your components.

### Dependency Detection System

The project includes an automated dependency detection system that analyzes component source code and manages dependencies.

1. **Dependency Configuration**

   Dependencies must be registered in `src/lib/constants.ts`:

   ```typescript
   export const POSSIBLE_DEPENDENCIES = [
   	{
   		dev: false, // Whether it's a dev dependency
   		name: 'bits-ui', // Import name to detect
   		packageName: 'bits-ui@next', // NPM package name
   		url: 'https://github.com/huntabyte/bits-ui' // Reference URL
   	}
   	// ... other dependencies
   ] as const;
   ```

> [!IMPORTANT]
> When using a new dependency in your component, you MUST add it to `POSSIBLE_DEPENDENCIES` first.
> This ensures the dependency detection system can find and document it correctly.

2. **Adding New Dependencies**

   To add a new dependency:

   1. Open `src/lib/constants.ts`
   2. Add an entry to `POSSIBLE_DEPENDENCIES`:
      ```typescript
      {
        dev: boolean,           // true for devDependencies, false for dependencies
        name: string,          // The import path to detect (e.g., 'your-package')
        packageName: string,   // The exact package name with version (e.g., 'your-package@1.0.0')
        url: string           // Package repository or documentation URL
      }
      ```
   3. Commit the change before adding components that use this dependency

3. **How It Works**

   The system (`src/lib/utils/handleComponentSource.ts`):

   - Scans component source code for imports
   - Matches imports against `POSSIBLE_DEPENDENCIES`
   - Generates installation commands
   - Adds dependency information to component metadata

4. **Special Cases**

   - Enhanced Images:

     ```typescript
     // Automatically detects and adds @sveltejs/enhanced-img
     const enhancedImageMatch = source.match(ENHANCED_IMAGE_REGEX);
     ```

   - Multiple Dependencies:
     ```bash
     # Combines dev and runtime dependencies
     pnpm i -D @iconify-json/ri unplugin-icons && pnpm i bits-ui
     ```

5. **Integration**

   The system integrates with:

   - Component API endpoints
   - Documentation generation
   - Development tooling

> [!TIP]
> When adding new components that use external packages:
>
> 1. First add the dependency to `POSSIBLE_DEPENDENCIES`
> 2. Then create your component with the imports
> 3. The system will automatically detect and document the dependencies

### Component Guidelines

- 1\. **Component Organization**

  - 1.1\. **Base (`/ui`) components**

    Base components are in the `src/lib/components/ui` folder.

    Each component should be in its own directory if it needs multiple components.

    ```
    component-category/
    ├── index.ts			# Exports
    └── component.svelte	# Main component
    ```

    If a component is a simple one, it can be placed in the `src/lib/components/ui` folder.

    ```
    component-category/
    └── component.svelte 	# Main component
    ```

  - 1.2\. **Origin UI components**

    Origin UI components are in the `src/lib/components` folder.

    Each component should be in its own desired category (e.g. `inputs`,`buttons`, etc.)

    ```
    component-category/
    ├── category-01.svelte
    ├── category-02.svelte
    └── ...
    ```

    If a component isn't achievable (e.g. not the necessary libraries available, not enough time to implement, etc.) you need to add a placeholder component in the `src/lib/components` folder. In this case the component should be named `category-03.todo.svelte`.

    ```
    component-category/
    └── category-03.todo.svelte
    ```

2. **Component Requirements**

   - Resemble the original component as closely as possible
   - If there is a "better" way to implement the component, use that
   - Use Svelte 5 runes for state management
   - Include TypeScript types for props and events
   - Implement proper ARIA attributes for accessibility

3. **Styling Guidelines**
   - Use Tailwind CSS for all styling
   - Follow the project's color scheme using CSS variables
   - Implement responsive design using Tailwind breakpoints
   - Use semantic HTML elements
   - Maintain dark mode support

### Pull Request Process

1. **Before Starting**

   - Check existing issues and PRs to avoid duplicate work
   - For new features, open an issue for discussion first
   - Fork the repository and create a feature branch:
     ```bash
     git checkout -b feature/your-feature-name
     ```

2. **Component Development**

   - Follow the component organization guidelines
   - Place components in appropriate directories
   - Use the correct naming convention:
     ```
     component-category/
     ├── category-XX.svelte      # Regular component
     └── category-XX.todo.svelte # Not yet possible
     ```
   - Run `pnpm generate:registry` after adding/modifying components

3. **Quality Checklist**

   - [ ] Component matches original design
   - [ ] Svelte 5 runes used correctly
   - [ ] TypeScript types are complete
   - [ ] ARIA attributes implemented
   - [ ] Dark mode works correctly
   - [ ] Responsive design tested
   - [ ] No console errors/warnings
   - [ ] Code formatted (`pnpm format`)
   - [ ] Linting passes (`pnpm lint`)

4. **Route Configuration**

   - For existing categories:
     - Ensure component follows naming pattern

5. **Documentation**

   - Include example usage

6. **Submitting the PR**

   ```bash
   git add .
   git commit -m "feat: add new component category"
   git push origin feature/your-feature-name
   ```

   - Use conventional commit messages:
     - `feat:` for new components/features
     - `fix:` for bug fixes
     - `docs:` for documentation
     - `refactor:` for code improvements
     - `chore:` for maintenance

> [!NOTE]
> Large PRs are harder to review. Consider breaking big changes into smaller, focused PRs.

### Need Help?

- Check existing issues and pull requests
- Join our discussions in the repository
- Open an issue for questions

We appreciate your contributions to the Svelte Community and to this project!

## Terms of Use

Feel free to use these components in personal and commercial projects. However, while the tutorials and demos are available for your use as-is, they cannot be redistributed or resold.

## Contact

For any questions or feedback, please open an issue on this repository.

## Notes

This project is a work in progress, and i am continuously working to improve and expand this collection.
