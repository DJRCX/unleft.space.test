# UNLEFT Space - Tech Stack & Resources

## 🚀 Core Frameworks

- **[Astro (v5)](https://astro.build/)**: The core static site generator powering the foundation of the project. Chosen for its Islands Architecture, incredible performance, and zero-JS-by-default output.
- **[React (v19)](https://react.dev/)**: The interactive UI library used for complex islands, such as the contact form, custom animations, and complex 21st.dev components.
- **[Vite](https://vitejs.dev/)**: The underlying build tool ensuring extremely fast hot module replacement and optimized production builds.

## 🎨 Styling & UI

- **[Tailwind CSS (v4)](https://tailwindcss.com/)**: Utility-first CSS framework for rapid, consistent styling across the app. We're using the modern, CSS-first Vite plugin approach.
- **[Shadcn UI](https://ui.shadcn.com/)**: Headless, accessible UI component primitives styled with Tailwind. We only bring in the code we need.
- **[21st.dev Components](https://21st.dev/)**: Hand-picked, highly engaging micro-interactions and complex graphical components (Background Shaders, Animated Cards, Etheral Shadows).

## 🪄 Animation & Graphics

- **[Framer Motion](https://www.framer.com/motion/)**: The powerhouse library powering our scroll reveals, stagger entrances, page transitions, and complex interactive animations.
- **[Three.js](https://threejs.org/) & [D3.js](https://d3js.org/)**: Advanced WebGL, math, and canvas-based graphics powering the interactive splash screen shaders and 3D globe visualizations.

## 🔤 Installed Typography (Google Fonts)

All fonts are cleanly installed directly via `BaseLayout` from the Google Fonts API and mapped to Tailwind variables in `global.css`.

- **[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)** (`font-heading`): Used for primary H1-H6 headings. Futuristic, wide, and geometric.
- **[Inter](https://fonts.google.com/specimen/Inter)** (`font-body`): Used for highly legible paragraph text and UI elements.
- **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)** (`font-mono`): Used for the interactive developer terminal component and code-related UI.
- **[Bruno Ace SC](https://fonts.google.com/specimen/Bruno+Ace+SC)** (`font-bruno`): Beautifully stylized, futuristic small-caps font ready for specialized headings and badges.
- **[Libre Barcode 39 Extended Text](https://fonts.google.com/specimen/Libre+Barcode+39+Extended+Text)** (`font-barcode`): A gritty, scannable barcode font ready for cyberpunk-esque stylistic decals and UI decorations.

## 🧩 Icons

- **[Lucide React](https://lucide.dev/)**: Crisp, consistent, and cleanly designed SVG vector icons. Fully compatible with Shadcn UI and used exclusively throughout all website sections.
