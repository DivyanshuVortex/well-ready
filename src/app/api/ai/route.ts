import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs-extra";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY not configured on server" }, { status: 500 });
  }

  try {
    const groq = new Groq({ apiKey });
    const formData = await req.formData();
    const audioFile = formData.get("file") as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Convert Blob to temporary file for Groq SDK
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `upload-${Date.now()}.wav`);
    await fs.writeFile(tempFilePath, buffer);

    // 1. Transcription (Whisper)
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-large-v3",
      language: "en",
      prompt: "Next.js, Prisma, MERN, React, Vite, Tailwind, Express, TypeScript, JavaScript, node.js, well-ready CLI",
    });

    // 2. Mapping (Llama)
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
          content: transcription.text,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    // Cleanup
    await fs.remove(tempFilePath);

    const aiResult = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json({ ...aiResult, transcription: transcription.text });
  } catch (error: unknown) {
    console.error("AI Proxy Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
