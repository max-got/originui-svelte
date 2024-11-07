# Origin UI - Svelte

> [!NOTE]
> This is a fork of the original [Origin UI](https://originui.com/) project. This project is not affiliated with the original. I'm grateful for their work and have created these Svelte components copied from their design.

> [!NOTE]
> This is a work in progress. For some components the necessary libraries are coming soon (e.g. [Bits UI](https://next.bits-ui.com/docs/introduction)) or are just not available yet (e.g. [React Payment Inputs](https://github.com/medipass/react-payment-inputs)). Maybe i will add them in the future myself.

Origin UI - Svelte is a collection of copy-and-paste components for quickly building app UIs using Svelte. The collection currently features 90+ components and is updated with new examples if the original library is updated.

## Demo

[originui-svelte.pages.dev/](https://originui-svelte.pages.dev/)

## Features

- Built with Svelte and TailwindCSS
- Fully customizable
- Responsive design

## Differences from the original [Origin UI](https://originui.com/)

- [x] [Svelte](https://svelte.dev) instead of ~~Next.js~~
- [x] [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) instead of ~~Lucide React~~
- [x] [Bits UI](https://next.bits-ui.com/docs/introduction) instead of ~~Radix UI~~

## Getting Started

### Development

> [!NOTE]
> This project uses [pnpm](https://pnpm.io/) as package manager.

1. Clone the repository:

   ```
   git clone https://github.com/max-got/originui-svelte.git
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Run the development server:

   ```
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

### Usage

You can copy and use the components in your Svelte project. Note that some components may require additional libraries - refer to the code comments at the top of each file for specific requirements.

### Prerequisites

If you want to use the components in your project, you need to setup the following:

- [Svelte](https://svelte.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Bits UI (Next)](https://next.bits-ui.com/docs/introduction)

#### Utils

In the `src/lib/utils.ts` folder you will find the common `cn` function for tailwindcss class merging.

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

## Components

- Inputs
- Buttons
- (More categories to be added)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Terms of Use

Feel free to use these components in personal and commercial projects. However, while the tutorials and demos are available for your use as-is, they cannot be redistributed or resold.

## Acknowledgements

- [Origin UI](https://originui.com/) - The original project that this Svelte version is copied from
- [Svelte](https://svelte.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Bits UI](https://next.bits-ui.com)

## Contact

For any questions or feedback, please open an issue on this repository.

## Notes

This project is a work in progress, and i am continuously working to improve and expand this collection.
