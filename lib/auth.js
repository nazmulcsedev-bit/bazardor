import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) console.warn("MONGODB_URI set kora nei");

// MongoClient query na hoa porjonto connect kore na, tai build-e safe
const client =
  globalThis._mongo ?? (globalThis._mongo = new MongoClient(uri || "mongodb://localhost:27017"));
const db = client.db();

// key thakle tobei provider chalu hobe
const google = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;
const github = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders: {
    ...(google && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }),
    ...(github && {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    }),
  },
});