import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "himyoga";

// Reuse a single MongoClient/connection promise across hot-reloads (dev) and
// warm serverless invocations (prod) — opening a fresh connection per request
// would exhaust Atlas's connection limit almost immediately.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  // `global` (not a module-scoped variable) survives Next.js dev's hot-reload
  // module resets, and is harmless-but-unnecessary-to-avoid in prod since
  // each cold start is a fresh process anyway.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
