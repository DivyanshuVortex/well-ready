# Well-Ready CLI - Template Documentation

## Available Templates

Well-Ready CLI now includes **8 templates** to kickstart your projects. All templates have been renamed for consistency.

### Frontend Templates

#### 1. **React + Vite (TypeScript)** (`react-vite-ts`)
- **Type**: Frontend only
- **Stack**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Features**: Modern Vite setup with React and TypeScript
- **Use Case**: Single-page applications, frontend-only projects

#### 2. **React + Vite + Tailwind** (`react-vite-tailwind`)
- **Type**: Frontend only
- **Stack**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Features**: Identical to `react-vite-ts` (alternative naming)
- **Use Case**: Single-page applications with Tailwind

### Next.js Templates

#### 3. **Next.js + Prisma** (`nextjs-prisma`)
- **Type**: Full-stack
- **Stack**: Next.js 15.5 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Prisma ORM
- **Features**: Next.js App Router, Prisma integration
- **Use Case**: Full-stack Next.js applications with database

#### 4. **Next.js App Router** (`nextjs-app-router`)
- **Type**: Full-stack
- **Stack**: Next.js 15.5 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Prisma ORM
- **Features**: Modern Next.js App Router setup
- **Use Case**: Server-side rendered applications

### MERN Templates

#### 5. **MERN Stack (Basic)** (`mern-basic`)
- **Type**: Full-stack (Client + Server)
- **Frontend**: Vite + React + JavaScript
- **Backend**: Express + MongoDB
- **Features**: Basic MERN stack without TypeScript
- **Use Case**: Simple full-stack applications

#### 6. **MERN Stack (TypeScript)** (`mern-ts`)
- **Type**: Full-stack (Client + Server)
- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS v4
- **Backend**: Express + MongoDB + TypeScript
- **Features**: Full TypeScript MERN stack with Tailwind
- **Authentication**: JWT + bcrypt
- **Use Case**: Production-ready full-stack applications

#### 7. **MERN Stack (TypeScript + Tailwind)** (`mern-ts-tailwind`)
- **Type**: Full-stack (Client + Server)
- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS v4
- **Backend**: Express + MongoDB + TypeScript
- **Features**: Identical to `mern-ts` (alternative naming)
- **Use Case**: Full-stack applications with modern styling

### Backend Templates

#### 8. **Express API (TypeScript)** (`express-ts`)
- **Type**: Backend only
- **Stack**: Express + TypeScript + MongoDB
- **Features**: RESTful API server with TypeScript
- **Authentication**: JWT + bcrypt
- **Database**: MongoDB with Mongoose
- **Use Case**: Backend APIs, microservices

## Template Structure

### Frontend-only Templates
```
project-name/
├── src/
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

### Next.js Templates
```
project-name/
├── app/
├── public/
├── prisma/
├── package.json
├── next.config.ts
└── tsconfig.json
```

### MERN Templates
```
project-name/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── src/
│   └── package.json
└── package.json (root)
```

### Backend-only Template
```
project-name/
├── src/
│   ├── server.ts
│   ├── routes/
│   └── models/
├── .env
├── package.json
└── tsconfig.json
```