# CareerMap - Career & Business Guidance Platform

## Overview

CareerMap is a comprehensive full-stack web application providing career guidance, job discovery, and business opportunity exploration for students and professionals in India. The platform offers interactive career mapping, interest-based career matching, job listings (government and private), business idea exploration, and ROI calculation tools.

The application is built as a Single Page Application (SPA) with React frontend and Express backend, designed for mobile-first usage with support for multiple Indian languages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript
- **Routing**: React Router 6 in SPA mode with client-side routing and fallback support for GitHub Pages deployment
- **State Management**: Zustand for global state with persistence middleware
- **Data Fetching**: TanStack Query for server state management
- **UI Framework**: Radix UI components with Tailwind CSS 3 theming
- **Styling**: Tailwind CSS 3 with CSS variables for theming, dark mode support via class-based switching
- **3D Graphics**: React Three Fiber with Drei helpers for 3D visualizations
- **Build Tool**: Vite for fast development and optimized production builds

**Key Design Patterns**:
- Lazy loading for route components to improve initial load time
- Error boundaries for graceful error handling
- Mobile-first responsive design with breakpoint-based optimizations
- Performance optimizations including debouncing, throttling, and intersection observers
- Internationalization (i18n) support for 6 Indian languages (English, Hindi, Bengali, Telugu, Tamil, Marathi)

**Component Structure**:
- Page components in `client/src/pages/` for major routes
- Reusable UI components in `client/src/components/`
- Shared components like Layout, Navigation, and ErrorBoundary
- Dynamic career mapping components with step-by-step visualization

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Server Mode**: Integrated with Vite dev server in development, standalone in production
- **API Pattern**: RESTful API with `/api` prefix for all endpoints
- **Error Handling**: Centralized error middleware with status codes and messages
- **Development**: Hot module replacement via Vite middleware integration
- **Production**: Static file serving for built SPA with fallback to index.html for client-side routing

**Storage Layer**:
- **Interface**: IStorage abstraction for CRUD operations
- **Implementation**: MemStorage (in-memory) as default, designed to be swappable with database implementation
- **Data Models**: User model with username/password fields
- **Schema Validation**: Zod schemas for runtime type validation

**Design Decisions**:
- Minimal backend footprint - most logic lives client-side to reduce server dependencies
- API endpoints only created when strictly necessary (e.g., for server-side secrets or data persistence)
- Shared types between client and server via `shared/` directory
- Environment variable validation at startup for required configuration

### Data Storage Solutions

**Current Implementation**:
- **Primary Storage**: In-memory storage (MemStorage class) for development
- **Client-Side Storage**: LocalStorage for user preferences, saved items, and i18n settings
- **State Persistence**: Zustand persist middleware for offline-first experience

**Database Ready**:
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Defined in `shared/schema.ts` with type inference
- **Migrations**: Directory structure in place at `./migrations`
- **Connection**: Configured via DATABASE_URL environment variable (Neon serverless driver)
- **Design Note**: Application currently functions without database; Postgres can be added later when persistence is needed

**Data Files**:
- JSON datasets for careers, interests, jobs, business ideas stored in `client/public/data/`
- Loaded client-side for offline capability and fast access
- Comprehensive datasets: 2000+ interests, 400+ career paths, 100+ job listings, 500+ business ideas

### Authentication and Authorization

**Current State**: Authentication structure is scaffolded but not actively enforced
- User model defined in schema with username/password fields
- Storage interface includes user CRUD methods
- No active auth endpoints or middleware currently implemented

**Planned Approach**:
- Session-based authentication with express-session
- PostgreSQL session store via connect-pg-simple (already in dependencies)
- Optional social auth providers (Google, Facebook, Phone) per site configuration
- Login not required for core features; prompts for saving/personalization

### External Dependencies

**Third-Party Services**:
- **Neon Database**: Serverless PostgreSQL (configured but not yet utilized)
- **YouTube API**: Career guidance videos and form-filling tutorials embedded throughout app
- **Government Job Portals**: External links to official application portals (NIC, AIIMS, SBI, etc.)

**Key NPM Packages**:
- **UI/UX**: @radix-ui/* components, lucide-react icons, class-variance-authority, clsx, tailwind-merge
- **Forms**: react-hook-form with @hookform/resolvers for validation
- **Data**: @tanstack/react-query, zustand, zod for schemas
- **3D**: @react-three/fiber, @react-three/drei, @react-three/postprocessing
- **Dev Tools**: vite, tsx, esbuild, drizzle-kit
- **Date Handling**: date-fns for formatting and manipulation
- **Fonts**: @fontsource/inter for typography

**Build & Deployment**:
- Development: `npm run dev` - Vite dev server with Express middleware
- Production Build: `npm run build` - Vite client build + esbuild server bundle
- Deployment Target: GitHub Pages (SPA routing with 404.html fallback script)
- Asset Handling: GLTF/GLB models, MP3/OGG/WAV audio files included in asset pipeline

**Performance Tools**:
- Vite plugin for runtime error overlay (@replit/vite-plugin-runtime-error-modal)
- GLSL shader support via vite-plugin-glsl
- Service worker ready (sw.js) for offline caching strategy
- Performance monitoring utilities (debounce, throttle, lazy loading observers)

**Configuration Files**:
- TypeScript: Strict mode disabled for flexibility, bundler module resolution
- PostCSS: Tailwind CSS and Autoprefixer
- Drizzle: PostgreSQL dialect with schema in shared directory
- Path aliases: `@/*` for client, `@shared/*` for shared code