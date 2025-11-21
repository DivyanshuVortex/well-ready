# well-ready

[![npm version](https://img.shields.io/npm/v/well-ready.svg?style=flat-square)](https://www.npmjs.com/package/well-ready)
[![npm downloads](https://img.shields.io/npm/dm/well-ready.svg?style=flat-square)](https://www.npmjs.com/package/well-ready)
[![CLI Tool](https://img.shields.io/badge/CLI-Tool-blue?style=flat-square)](https://www.npmjs.com/package/well-ready)

**Well-Ready: Bootstrap your Next.js project instantly, preconfigured with Tailwind CSS, ESLint, and Prettier for a seamless development experience among different tech stacks.**

## Features

-  **Next.js Setup**: Initializes a fresh Next.js project with the latest stable version.
-  **Tailwind CSS Integration**: Fully configured Tailwind CSS for rapid UI development.
-  **ESLint Configuration**: Enforces code quality with standard ESLint rules and plugins.
-  **Prettier Formatting**: Automatic code formatting for consistent style across your project.
-  **Quick Start**: One-command setup to get you coding faster without manual configurations.

## Usage

Get started effortlessly with `npx` for a one-time use, or install globally for repeated access.

### Quick Run (Recommended)
```bash
npx well-ready
```

Well-Ready can bootstrap a variety of web applications, including:

- Next.js projects
- MERN (basic or TypeScript + Tailwind CSS) stacks
- Turbo apps

And other modern web app templates
Simply run the command, follow the interactive prompts, and your project will be ready with all configurations in place.

##  Technologies Used in This Project

well-ready is built with a modern, reliable, and scalable toolset to ensure fast execution, clean architecture, and easy template expansion.  
Below is a breakdown of the core technologies powering the CLI:

### **Core Stack**
- **Node.js** — Runtime environment for executing the CLI  
- **TypeScript** — Strong typing, improved DX, safer codebase  
- **ESM Modules** — Modern module system for better compatibility and performance  
- **npm** — Package distribution + dependency management

### **CLI Functionality**
- **Inquirer / Prompts** — Interactive terminal prompts for template selection  
- **Chalk** — Terminal styling and colored output   
- **fs / fs-extra** — File operations for copying and generating templates  
- **path / url modules** — Safe path resolution for templates and scaffolding  

### **Template Handling**
- **Template copying utilities** — Handles deep file cloning  
- **Dynamic file generators** — Generates `.env`, configs, and starter files  
- **Shell commands** — Executes dependency installation via npm/yarn/pnpm

### **Templates Technology (Supported Stacks)**
- **Next.js** (App Router)  
- **Tailwind CSS v4**  
- **Prisma ORM**  
- **Express.js (TypeScript)**  
- **React + Vite (TypeScript)**  
- **MERN stacks (JS + TS)**  
- **Turbo Repo Starter** *(in progress)*

### **Quality & Formatting**
- **ESLint** — Ensures consistent, clean JavaScript/TypeScript code  
- **Prettier** — Automatic formatting across templates  
- **Git-friendly structure** — Every generated project is ready for version control
- **CI/CD git workflow** - Make the check before alter the code 

---


##  Open to Contribute

well-ready is fully open to contributions — whether it’s improving existing templates, adding new stacks, enhancing the CLI experience, or fixing bugs.

## License

MIT License

Copyright (c) 2025 Divyanshu Chandra

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.