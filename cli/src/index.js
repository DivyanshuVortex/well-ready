#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to templates relative to this CLI file
const TEMPLATES_DIR = path.join(__dirname, '../../templates');

async function main() {
  console.log(chalk.cyan.bold('\n🚀 Welcome to Well-Ready CLI!\n'));

  // Ask user for template and project name
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select a project template:',
      choices: ['Mern-basic', 'MERN-TS', 'MERN-Tailwind', 'MERN-Tailwind-TS'],
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      validate: input => input ? true : '❌ Project name cannot be empty!',
    },
  ]);

  const { template, projectName } = answers;
  const templatePath = path.join(TEMPLATES_DIR, template);
  const projectPath = path.join(process.cwd(), projectName);

  try {
    // Copy template to new project folder
    const spinnerCopy = ora(`📂 Creating project folder '${projectName}'...`).start();
    await fs.copy(templatePath, projectPath);
    spinnerCopy.succeed(chalk.green('✅ Project folder created successfully!'));

    // Install dependencies
    const spinnerInstall = ora('📦 Installing dependencies... This might take a few minutes').start();
    await execa('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });
    spinnerInstall.succeed(chalk.green('🎉 Dependencies installed successfully!'));

    // Final instructions
    console.log(chalk.blue.bold('\n🚀 All set! Your project is ready.\n'));
    console.log(chalk.yellow('Next steps:'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm run dev\n'));
    console.log(chalk.green('Happy coding! ✨'));
  } catch (err) {
    console.error(chalk.red('❌ Something went wrong!'), err);
  }
}

main();
