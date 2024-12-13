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
  - [Code Collapsing System](#code-collapsing-system)
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
- [TailwindCSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Bits UI](https://next.bits-ui.com)

## Differences from the original

The Original [Origin UI](https://originui.com/) is built with Next.js. This is a built with Svelte.

- [x] [Svelte](https://svelte.dev) instead of ~~Next.js~~
- [x] [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) instead of ~~Lucide React~~
- [x] [Bits UI](https://next.bits-ui.com/docs/introduction) instead of ~~Radix UI~~

## Getting Started

### Prerequisites

If you want to use the components in your project, you need to setup the following:

- [Svelte](https://svelte.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Bits UI (Next)](https://next.bits-ui.com/docs/introduction)
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

In the `src/lib/actions` folder you will find the common actions.

#### Base Components

You need to copy the base components from the `src/lib/components/ui` folder to your project and adjust the imports accordingly.

#### CSS Variables

Import the CSS in your `src/lib/app.css` file (the following is based on tailwindcss):

```css
@layer base {
	:root {
		--background: 0 0% 100%;
		--foreground: 240 10% 3.9%;
		--card: 0 0% 100%;
		--card-foreground: 240 10% 3.9%;
		--popover: 0 0% 100%;
		--popover-foreground: 240 10% 3.9%;
		--primary: 240 5.9% 10%;
		--primary-foreground: 0 0% 98%;
		--secondary: 240 4.8% 95.9%;
		--secondary-foreground: 240 5.9% 10%;
		--muted: 240 4.8% 95.9%;
		--muted-foreground: 240 3.8% 46.1%;
		--accent: 240 4.8% 95.9%;
		--accent-foreground: 240 5.9% 10%;
		--destructive: 0 84.2% 60.2%;
		--destructive-foreground: 0 0% 100%;
		--border: 240 5.9% 90%;
		--input: 240 4.9% 83.9%;
		--ring: 240 5% 64.9%;
		--radius: 0.5rem;
	}
	.dark {
		--background: 240 10% 3.9%;
		--foreground: 0 0% 98%;
		--card: 240 10% 3.9%;
		--card-foreground: 0 0% 98%;
		--popover: 240 10% 3.9%;
		--popover-foreground: 0 0% 98%;
		--primary: 0 0% 98%;
		--primary-foreground: 240 5.9% 10%;
		--secondary: 240 3.7% 15.9%;
		--secondary-foreground: 0 0% 98%;
		--muted: 240 5.9% 10%;
		--muted-foreground: 240 4.4% 58%;
		--accent: 240 5.9% 10%;
		--accent-foreground: 0 0% 98%;
		--destructive: 0 84.2% 60.2%;
		--destructive-foreground: 0 0% 100%;
		--border: 240 3.7% 15.9%;
		--input: 240 3.7% 15.9%;
		--ring: 240 3.8% 46.1%;
	}
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
│   │   │   ├── accordion.svelte 				# needs multiple components
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
│   ├── hooks/        							# Svelte hooks
│   ├── actions/      							# Svelte actions
│   └── config/       							# Configuration files
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
   │   ├── componentRegistry.ts        # Registry implementation
   │   └── data/api/
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
       ├── componentId.ts             # Component ID validation
       └── componentsPath.ts          # Path parameter validation
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

4. **Example Output**

   When a component uses dependencies:

   ```svelte
   <script>
   	import * as Accordion from 'bits-ui/accordion';
   	import { Icon } from '@iconify-json/ri';
   </script>
   ```

   The system automatically:

   ```markdown
   <!-- Dependencies:
   pnpm i -D @iconify-json/ri
   pnpm i bits-ui@next
   -->
   ```

5. **Special Cases**

   - Enhanced Images:

     ```typescript
     // Automatically detects and adds @sveltejs/enhanced-img
     const enhancedImageMatch = source.match(ENHANCED_IMAGE_REGEX);
     ```

   - Multiple Dependencies:
     ```bash
     # Combines dev and runtime dependencies
     pnpm i -D @iconify-json/ri unplugin-icons && pnpm i bits-ui@next
     ```

6. **Integration**

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

### Code Collapsing System

The project includes an automatic code collapsing system for better readability in the documentation. This feature is implemented in `src/lib/utils/shiki-transformer/collapsible.ts`.

1. **How to Use**

   Add collapse markers in your component code:

   ```svelte
   <script module lang="ts">
   	// [!code collapse-start]
   	const longDataArray = [
   		// ... many items
   	];
   	// [!code collapse-end]
   </script>
   ```

2. **Supported Comment Types**

   The system recognizes collapse markers, like this:

   ```typescript
   // JavaScript/TypeScript style
   // [!code collapse-start]
   // long code
   // [!code collapse-end]
   ```

3. **How It Works**

   The system:

   - Detects collapse markers in source code
   - Wraps the content in a collapsible section
   - Adds an "Expand/Collapse" button
   - Preserves code highlighting and formatting

4. **Example Use Case**

   Perfect for:

   - Large data arrays
   - Configuration objects
   - Repetitive code sections
   - Long utility functions

   ```svelte
   <script module lang="ts">
   	// [!code collapse-start]
   	const items = [
   		{ id: 1, value: '...' },
   		{ id: 2, value: '...' }
   		// ... many more items
   	];
   	// [!code collapse-end]
   </script>

   <script lang="ts">
   	// This code remains visible by default
   	let selectedItem = items[0];
   </script>
   ```

5. **Best Practices**

   - Use for non-essential code sections
   - Keep critical implementation details visible
   - Collapse large data structures
   - Use in documentation and examples

> [!TIP]
> Use code collapsing to improve the readability of your components in the documentation while keeping all code accessible when needed.

### Component Guidelines

- 1\. **Component Organization**

  - 1.1\. **Base (`/ui`) components**

    Base components are in the `src/lib/components/ui` folder.

    Each component should be in its own directory if it needs multiple components.

    ```
    component-category/
    ├── index.ts			# Exports
    ├── component.svelte	# Main component
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

    If a component is just waiting for a library to be implemented, you need to add a placeholder component in the `src/lib/components` folder. In this case the component should be named `category-04.soon.svelte`.

    ```
    component-category/
    └── category-04.soon.svelte
    ```

> [!NOTE]
> The component should have content. For example:
>
> ```html
> <p class="text-center text-sm text-muted-foreground">
> 	waiting for
> 	<a class="underline hover:text-foreground" href="https://github.com/huntabyte/bits-ui/pull/582"
> 		>Bits UI TimeField</a
> 	>
> </p>
> ```

- 1.3\. **Route Configuration**

  When adding a new component category, you must configure its routing in `src/lib/config/routes.ts`:

  ```typescript
  {
    componentDirectory: ['your-category'], // Directory name(s) containing components
    header: {
      description: 'A growing collection of ${count} components built with Svelte and TailwindCSS.',
      title: 'Your Category'
    },
    label: 'Your Category', // Navigation label
    order: 12, // Navigation order (increment from last)
    path: 'your-category', // URL path
    seo: {
      description: 'An extensive collection of copy-and-paste components built with Svelte and TailwindCSS.',
      keywords: 'your, keywords, component, svelte, tailwindcss',
      title: 'Your Category',
      twitterDescription: 'An extensive collection of copy-and-paste components built with Svelte and TailwindCSS.',
      twitterTitle: 'Your Category'
    }
  }
  ```

  For combined categories (like inputs/textareas), use multiple directories:

  ```typescript
  componentDirectory: ['category1', 'category2'],
  path: 'combined-category'
  ```

> [!NOTE]
> The `order` property determines the navigation menu order. Check existing routes for the next available number.

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
     ├── category-XX.todo.svelte # Not yet possible
     └── category-XX.soon.svelte # Waiting for dependency
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

   - If adding a new category:
     - Add entry to `src/lib/config/routes.ts`
     - Configure SEO metadata
     - Set correct navigation order
   - For existing categories:
     - Ensure component follows naming pattern
     - Update component count in route description

5. **Documentation**

   - Include example usage
   - Document any required props
   - Note any dependencies
   - Add placeholder content for `.todo` and `.soon` components

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

7. **PR Description Template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of change

   - [ ] New component(s)
   - [ ] Bug fix
   - [ ] Documentation update
   - [ ] Refactoring

   ## Checklist

   - [ ] Run `pnpm generate:registry`
   - [ ] Tested in light/dark mode
   - [ ] Responsive design verified
   - [ ] Accessibility checked
   - [ ] Documentation updated
   ```

8. **After Submission**
   - Respond to review comments promptly
   - Keep the PR focused and small
   - Update your branch if needed:
     ```bash
     git fetch origin
     git rebase origin/main
     ```

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
