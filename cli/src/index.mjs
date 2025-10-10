#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to templates relative to this CLI file
const TEMPLATES_DIR = path.join(__dirname, '../../templates');

async function main() {
  console.log(chalk.blue.bold('\nWelcome to Well-Ready CLI!\n'));

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
      validate: input => input ? true : 'Project name cannot be empty!',
    },
  ]);

  const { template, projectName } = answers;
  const templatePath = path.join(TEMPLATES_DIR, template);
  const projectPath = path.join(process.cwd(), projectName);

  try {
    // Copy template to new project folder
    console.log(chalk.yellow('\nCreating project...'));
    await fs.copy(templatePath, projectPath);
    console.log(chalk.green('Project created successfully!\n'));

    // Install dependencies
    console.log(chalk.yellow('Installing dependencies...'));
    await execa('pnpm', ['install'], { cwd: projectPath, stdio: 'inherit' });

    console.log(chalk.green.bold(`\nAll done! Navigate to ${projectName} and start coding!\n`));
    console.log(chalk.blue(`cd ${projectName} && pnpm run dev`));
  } catch (err) {
    console.error(chalk.red('Error:'), err);
  }
}

main();
