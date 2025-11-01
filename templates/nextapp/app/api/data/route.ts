export async function GET() {
  const data = {
    message: "Hello from your Next.js backend! and Prisma is working!",
    time: new Date().toLocaleString(),
    tips: [
      "Next.js combines frontend + backend in one app",
      "API routes are serverless functions",
      "use client makes a component interactive"
    ],
  };
  return Response.json(data);
}
