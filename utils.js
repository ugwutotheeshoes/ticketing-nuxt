import { Client, Databases } from "appwrite";
const client = new Client();
const databases = new Databases(client);
client
.setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
.setProject("64674fbac5e8de062a93"); // Your project ID
export const getRequests = databases.listDocuments(
  "6468b209dd590cb9f04e",
  "6468b37de0831b14cf16"
);
