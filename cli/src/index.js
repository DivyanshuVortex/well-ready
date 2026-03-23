#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";
import "dotenv/config";

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
        new inquirer.Separator(),
        { name: chalk.cyanBright("🎤 Voice Command (AI Powered)"), value: "voice" },
      ],
    },
    {
      type: "input",
      name: "projectName",
      message: chalk.yellow("📝 Enter your project name:"),
      validate: (input) => input.trim() !== "" || "❌ Project name cannot be empty!",
      when: (currentAnswers) => currentAnswers.template !== "voice",
    },
  ]);

  let { template, projectName } = answers;

  if (template === "voice") {
    const aiResult = await handleVoiceCommand();
    if (!aiResult) return;
    ({ template, projectName } = aiResult);
    
    console.log(chalk.cyan("\n🤖 AI Interpretation:"));
    console.log(chalk.white(`   📦 Template: `) + chalk.green(template));
    console.log(chalk.white(`   📝 Project:  `) + chalk.green(projectName) + "\n");
  }

  const templatePath = path.join(TEMPLATES_DIR, template);
  const projectPath = path.join(process.cwd(), projectName);

  try {
    if (!(await fs.pathExists(templatePath))) {
      throw new Error(`Template '${template}' not found in ${TEMPLATES_DIR}`);
    }
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
    const nextSteps = template.includes("nextjs") ? "npm run dev" : template.includes("mern") ? "npm run dev (root)" : "npm run dev";

    console.log("\n" + chalk.cyanBright("╭──────────────────────────────────────────────╮"));
    console.log(chalk.cyanBright("│") + chalk.greenBright.bold("  🚀 YOUR PROJECT IS READY TO GO!             ") + chalk.cyanBright("│"));
    console.log(chalk.cyanBright("├──────────────────────────────────────────────┤"));
    console.log(chalk.cyanBright("│") + chalk.white("  👉 Next steps:                              ") + chalk.cyanBright("│"));
    console.log(chalk.cyanBright("│") + chalk.yellow(`     cd ${projectName.padEnd(30)} `) + chalk.cyanBright("│"));
    console.log(chalk.cyanBright("│") + chalk.yellow(`     ${nextSteps.padEnd(33)} `) + chalk.cyanBright("│"));
    console.log(chalk.cyanBright("╰──────────────────────────────────────────────╯\n"));
    console.log(chalk.green("✨ Happy coding with WELL-READY CLI! 💻"));
  } catch (err) {
    console.log("\n" + chalk.red.bold("❌ Something went wrong!"));
    console.error(chalk.red(err.message));
  }
}

async function handleVoiceCommand() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.log(chalk.red("\n❌ GROQ_API_KEY not found in environment variables."));
    process.exit(1);
  }

  const groq = new Groq({ apiKey });
  const recordingPath = path.join(process.cwd(), "recording.wav");
  let recordingSuccess = false;
  let transcription = "";

  const spinnerRecord = ora({
    text: chalk.white("🎤 Recording... (10s left) - Press Enter to stop early"),
    color: "red",
  }).start();

  let timeLeft = 10;
  const countdownInterval = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft > 0) {
      spinnerRecord.text = chalk.white(`🎤 Recording... (${timeLeft}s left) - Press Enter to stop early`);
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);

  try {
    const ffmpegProc = execa("ffmpeg", ["-f", "pulse", "-i", "default", "-t", "10", "-y", recordingPath]);

    // Listen for Enter to stop early
    const rl = (await import("readline")).createInterface({
      input: process.stdin,
      terminal: false
    });

    const stopEarly = new Promise((resolve) => {
      rl.on("line", () => {
        ffmpegProc.kill("SIGINT");
        resolve();
      });
      ffmpegProc.on("exit", () => resolve());
    });

    await stopEarly;
    clearInterval(countdownInterval);
    rl.close();
    recordingSuccess = (await fs.pathExists(recordingPath)) && (await fs.stat(recordingPath)).size > 1000;
    
    if (recordingSuccess) {
      spinnerRecord.succeed(chalk.green("✅ Recording captured!"));
    } else {
      throw new Error("Recording too short or failed.");
    }
  } catch (err) {
    clearInterval(countdownInterval);
    if (!recordingSuccess) {
      spinnerRecord.warn(chalk.yellow("⚠️ Audio recording failed or skipped. Falling back to manual text input."));
      const { manualInput } = await inquirer.prompt([{
      type: "input",
      name: "manualInput",
      message: chalk.cyan("⌨️ Describe your project (e.g., 'MERN stack with TypeScript called my-app'):"),
      validate: (input) => input.trim() !== "" || "❌ Input cannot be empty!",
    }]);
    transcription = manualInput;
  }
}

  const spinnerAI = ora({ text: chalk.white("🧠 Processing with AI..."), color: "magenta" }).start();

  try {
    if (recordingSuccess) {
      const transcriptionResponse = await groq.audio.transcriptions.create({
        file: fs.createReadStream(recordingPath),
        model: "whisper-large-v3",
        language: "en",
        prompt: "Next.js, Prisma, MERN, React, Vite, Tailwind, Express, TypeScript, JavaScript, node.js, well-ready CLI",
      });
      transcription = transcriptionResponse.text;
      console.log(chalk.gray(`\n🎤 Transcribed: "${transcription}"`));
      await fs.remove(recordingPath);
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an assistant for the WELL-READY CLI.
          Map the user's request to one of these templates: express-ts, mern-basic, mern-ts, mern-ts-tailwind, nextjs-app-router, nextjs-prisma, react-vite-tailwind, react-vite-ts.
          
          Extract a project name if mentioned (e.g., "named ANYTHUG", "with the name of ANYTHUG", "called X").
          If no name is mentioned, use "my-well-ready-project".
          
          Return ONLY valid JSON: { "template": "template-name", "projectName": "name" }`,
        },
        {
          role: "user",
          content: transcription,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(completion.choices[0].message.content);
    spinnerAI.succeed(chalk.green("✨ Request structured!"));

    // UX: If AI didn't catch a name, ask the user
    if (aiResult.projectName === "my-well-ready-project") {
      const { manualName } = await inquirer.prompt([{
        type: "input",
        name: "manualName",
        message: chalk.yellow("📝 AI couldn't find a project name. What should we call it?"),
        default: "my-well-ready-project",
      }]);
      aiResult.projectName = manualName;
    }

    return aiResult;
  } catch (err) {
    spinnerAI.fail(chalk.red("❌ AI processing failed."));
    console.error(chalk.gray(err.message));
    return null;
  }
}

main();
