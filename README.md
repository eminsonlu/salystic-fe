# Salystic Frontend

A responsive, animated salary benchmarking application frontend built with Next.js, React, and TypeScript.

## 🚀 Features

- **Dark Theme Support**: Automatic light/dark mode with CSS `prefers-color-scheme` and Tailwind.
- **Shadcn UI**: Reusable component library built on Radix and Tailwind CSS.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **Interactive Charts**: Data visualization with Recharts (or Chart.js).
- **Animations Everywhere**: Scroll-triggered effects, mouse-follow animations, and component transitions with Framer Motion.
- **Modular Architecture**: Clear separation between site and admin panel.
- **Service**: Using axios for api process.

## 🧰 Technologies

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State Management**: zustand (in `stores/`)

## 💻 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/salystic-frontend.git
   cd salystic-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Start the production server**
   ```bash
   npm start
   # or
   yarn start
   ```

## 📂 Project Structure

```
frontend/
├── app/              # Next.js app directory (pages, layout, metadata)
├── assets/           # Static assets (images, fonts)
├── components/       # Reusable components
│   ├── site/         # Components used in the public-facing site
│   ├── panel/        # Components for the admin panel
│   └── shared/       # Shared components (buttons, inputs, modals)
├── containers/       # Page-level containers
│   ├── site/         # Site pages and layouts
│   └── panel/        # Admin panel pages and layouts
├── hooks/            # Custom React hooks
├── public/           # Static public files (favicon, robots.txt)
├── services/         # API service modules (REST, GraphQL)
├── stores/           # State management (e.g., zustand stores)
├── types/            # TypeScript interfaces and types
└── utils/            # Utility functions and helpers
```

## 🔧 Available Scripts

- `npm run dev` / `yarn dev`: Run app in development mode.
- `npm run build` / `yarn build`: Build for production.
- `npm start` / `yarn start`: Start production server.

---

Built with ❤️ by the Salystic team. Feel free to contribute via pull requests and issues!
