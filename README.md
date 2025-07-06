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

1. **Component Requirements**
   - Resemble the original component as closely as possible
   - If there is a "better" way to implement the component, use that
   - Use Svelte 5 runes for state management
   - Include TypeScript types for props and events
   - Implement proper ARIA attributes for accessibility

2. **Styling Guidelines**
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

4. **Documentation**
   - Include example usage

5. **Submitting the PR**

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
