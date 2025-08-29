# 🕵️‍♂️ Viewport Detective

<div align="center">



**A minimalistic, modern viewport inspector that helps developers debug responsive designs with precision.**

[
]
[
]

[🚀 Live Demo](https://viewportdetective.vercel.app) -  [📖 Documentation](#features) -  [🐛 Report Bug](https://github.com/RootDeveloperDS/ViewPort_Detective/issues) -  [✨ Request Feature](https://github.com/RootDeveloperDS/ViewPort_Detective/issues)

</div>

***

## 🎯 What is Viewport Detective?

Viewport Detective is a **real-time browser viewport inspector** built for developers who want to perfect their responsive designs. No more guessing viewport dimensions or wrestling with browser dev tools—get instant, accurate viewport information with a clean, distraction-free interface.

### 🌟 Why Choose Viewport Detective?

- **🔍 Real-time Detection**: Watch viewport dimensions update instantly as you resize
- **📱 Device-Aware**: Shows device pixel ratio, orientation, and safe area insets
- **🎨 Breakpoint Visualization**: See which CSS breakpoint you're currently in
- **📋 One-Click Copy**: Copy all viewport details to clipboard instantly
- **🌓 Theme Adaptive**: Beautiful light and dark modes
- **⚡ Lightning Fast**: Built with Next.js 14 and optimized for performance

***

## ✨ Features

### 🔮 Core Functionality

- **📐 Live Viewport Dimensions**: Real-time width × height display with smooth animations
- **🖥️ Device Pixel Ratio**: Critical for high-DPI display optimization
- **📱 Orientation Detection**: Portrait/Landscape status for mobile-first design
- **🔒 Safe Area Insets**: Essential for notched and modern mobile devices
- **📏 CSS Breakpoints**: Visual indicator for xs/sm/md/lg/xl breakpoints
- **📋 Copy to Clipboard**: One-click copy of complete viewport information

### 🎨 User Experience

- **🌓 Dark/Light Themes**: Instantly toggle between beautiful themes
- **✨ Smooth Animations**: Fluid transitions that don't distract from work
- **📱 Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **⚡ Performance Optimized**: Minimal bundle size, maximum performance
- **♿ Accessible**: Built with accessibility best practices

### 🛠️ Developer Features

- **🔧 TypeScript**: Full type safety and IntelliSense support
- **🎯 Modern Stack**: Next.js 14, React 18, Tailwind CSS 3
- **📦 Zero Dependencies**: Minimal external dependencies for reliability
- **🔄 Hot Reload**: Instant development feedback
- **📱 PWA Ready**: Can be installed as a Progressive Web App

***

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/RootDeveloperDS/ViewPort_Detective.git

# Navigate to project directory
cd ViewPort_Detective

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start detecting! 🕵️‍♂️

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

***

## 🛠️ Tech Stack

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.0+ | React framework with App Router |
| **TypeScript** | 5.0+ | Type safety and developer experience |
| **Tailwind CSS** | 3.3+ | Utility-first CSS framework |
| **Lucide React** | Latest | Beautiful, customizable icons |
| **React Hooks** | 18.2+ | State management and side effects |

</div>

***

## 📱 Responsive Breakpoints

Viewport Detective uses standard CSS breakpoints:

```css
xs: < 640px    /* Mobile portrait */
sm: 640px+     /* Mobile landscape */
md: 768px+     /* Tablets */
lg: 1024px+    /* Laptops */
xl: 1280px+    /* Desktops */
```

***

## 🎨 Customization

### Theme Colors

The app supports full theming through Tailwind CSS variables:

```css
/* Light Theme */
--background: 255 255 255;
--foreground: 0 0 0;

/* Dark Theme */
--background: 17 24 39;
--foreground: 255 255 255;
```

### Breakpoint Customization

Modify breakpoints in `src/hooks/useViewport.ts`:

```typescript
const getBreakpoint = (width: number): string => {
  if (width < 640) return 'xs'
  if (width < 768) return 'sm'
  // Add your custom breakpoints here
  if (width < 1024) return 'md'
  if (width < 1280) return 'lg'
  return 'xl'
}
```

***

## 🤝 Contributing

We love contributions! Here's how you can help make Viewport Detective even better:

### 🐛 Found a Bug?

1. Check if the issue already exists in [Issues](https://github.com/RootDeveloperDS/ViewPort_Detective/issues)
2. Create a new issue with detailed reproduction steps
3. Include your browser, OS, and viewport dimensions

### 💡 Have an Idea?

1. Open a [Feature Request](https://github.com/RootDeveloperDS/ViewPort_Detective/issues/new)
2. Describe your idea and why it would be useful
3. We'll discuss implementation details together

### 🔧 Want to Code?

```bash
# Fork the repo and create your feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m 'Add amazing feature'

# Push to your branch
git push origin feature/amazing-feature

# Open a Pull Request
```

***

## 📊 Browser Support

| Browser | Supported Versions |
|---------|-------------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

***

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

***

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for making styling enjoyable
- **Lucide** for beautiful, consistent icons
- **Vercel** for seamless deployment platform

***

## 📞 Connect

<div align="center">

**Built with ❤️ by [Devansh Sharma](https://github.com/RootDeveloperDS)**

[
[

Made for developers, by RootDeveloperDS (Devansh Sharma). 🚀

</div>

***

<div align="center">

**If Viewport Detective helped you build better responsive designs, consider giving it a ⭐!**

</div>
