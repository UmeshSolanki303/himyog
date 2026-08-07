// Runs once when the Next.js server process starts (dev boot, or a fresh
// serverless cold start) — kicks off the MongoDB connection immediately so
// it's already warm (or well underway) by the time the first real request
// needs it, instead of paying that latency on whichever request happens first.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { getDb } = await import("./lib/mongodb");
    getDb().catch(() => {
      // Swallow here — a real connection failure will surface normally on
      // the first actual query, with a proper error response.
    });
  }
}
