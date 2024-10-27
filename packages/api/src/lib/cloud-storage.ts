import { env } from "@acme/env";
import { Storage } from "@google-cloud/storage";
import { type CredentialBody } from "google-auth-library";

const base64ServiceAccount = env.GOOGLE_SERVICE_ACCOUNT_BASE64;
const serviceAccountBuffer = Buffer.from(base64ServiceAccount, "base64");
const cloudStorageCredentials = JSON.parse(serviceAccountBuffer.toString()) as CredentialBody;

export const cloudStorage = new Storage({
  credentials: cloudStorageCredentials,
  projectId: env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
}); 
