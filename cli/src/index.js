#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";
import { fileURLToPath } from "url";

// ESM __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to templates
const TEMPLATES_DIR = path.join(__dirname, "../../templates");
// ✅ Final banner displaying only "R CLI"
 





// Correct ASCII banner for WELL-READY
const banner = `
${chalk.blueBright.bold("██╗    ██╗███████╗██╗     ██╗          ██████╗  ███████╗ █████╗ ██████╗ ██╗   ██╗")}
${chalk.blueBright.bold("██║    ██║██╔════╝██║     ██║          ██╔══██╗ ██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝")}
${chalk.blueBright.bold("██║ █╗ ██║█████╗  ██║     ██║          ██████╔╝ █████╗  ███████║██║  ██║ ╚████╔╝ ")}
${chalk.blueBright.bold("██║███╗██║██╔══╝  ██║     ██║          ██╔══██╗ ██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  ")}
${chalk.blueBright.bold("╚███╔███╔╝███████╗███████╗███████╗     ██║  ██║ ███████╗██║  ██║██████╔╝   ██║   ")}
${chalk.blueBright.bold(" ╚══╝╚══╝ ╚══════╝╚══════╝╚══════╝     ╚═╝  ╚═╝ ╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝   ")}
${chalk.cyanBright.bold("                              WELL - READY ⚡ CLI                              ")}
`;

async function main() {
  console.clear();
  console.log(chalk.cyanBright(banner));
  console.log(chalk.whiteBright("✨ Welcome to ") + chalk.blueBright.bold("WELL-READY CLI") + chalk.whiteBright(" — Your Instant Project Starter!\n"));

  // Prompt user for template and project name
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: chalk.yellow("📦 Select a project template:"),
      choices: [
        { name: "Next.js + Prisma", value: "nextjs-prisma" },
        { name: "Next.js App Router", value: "nextjs-app-router" },
        { name: "MERN Stack (Basic)", value: "mern-basic" },
        { name: "MERN Stack (TypeScript)", value: "mern-ts" },
        { name: "MERN Stack (TypeScript + Tailwind)", value: "mern-ts-tailwind" },
        { name: "React + Vite (TypeScript)", value: "react-vite-ts" },
        { name: "React + Vite + Tailwind", value: "react-vite-tailwind" },
        { name: "Express API (TypeScript)", value: "express-ts" },
      ],
    },
    {
      type: "input",
      name: "projectName",
      message: chalk.yellow("📝 Enter your project name:"),
      validate: (input) => input.trim() !== "" || "❌ Project name cannot be empty!",
    },
  ]);

  const { template, projectName } = answers;
  const templatePath = path.join(TEMPLATES_DIR, template);
  const projectPath = path.join(process.cwd(), projectName);

  try {
    // Step 1: Copy template
    const spinnerCopy = ora({
      text: chalk.white(`📂 Creating project folder '${projectName}'...`),
      color: "cyan",
    }).start();

    await fs.copy(templatePath, projectPath);
    spinnerCopy.succeed(chalk.green("✅ Project folder created successfully!"));

    // Step 2: Install dependencies
    const spinnerInstall = ora({
      text: chalk.white("📦 Installing dependencies..."),
      color: "blue",
    }).start();

    await execa("npm", ["install"], { cwd: projectPath, stdio: "inherit" });
    spinnerInstall.succeed(chalk.green("🎉 Dependencies installed successfully!"));

    // Step 3: Success message
    console.log("\n" + chalk.cyanBright("───────────────────────────────────────────────"));
    console.log(chalk.greenBright("🚀 Your project is ready to go!"));
    console.log(chalk.white("👉 Next steps:"));
    console.log(chalk.yellow(`   cd ${projectName}`));
    console.log(chalk.yellow("   npm run dev"));
    console.log(chalk.cyanBright("───────────────────────────────────────────────\n"));
    console.log(chalk.green("✨ Happy coding with WELL-READY CLI! 💻"));
  } catch (err) {
    console.log("\n" + chalk.red.bold("❌ Something went wrong!"));
    console.error(chalk.red(err.message));
  }
}

main();
