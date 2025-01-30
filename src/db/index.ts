import { drizzle } from "drizzle-orm/node-postgres";
// Import Schemas
import {
  annotations as annotationsSchema,
  comments as commentsSchema,
  poems as poemsSchema,
  users as usersSchema,
} from "./schema.ts";

import pg from "pg";

// instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: { usersSchema, poemsSchema, annotationsSchema, commentsSchema },
});

// Create

export async function insertUser(userObj: typeof usersSchema) {
  return await db.insert(usersSchema).values(userObj);
}

export async function insertPoem(poemObj: typeof poemsSchema) {
  return await db.insert(poemsSchema).values(poemObj);
}

export async function insertAnnotation(
  annotationObj: typeof annotationsSchema,
) {
  return await db.insert(annotationsSchema).values(annotationObj);
}

export async function insertComment(commentObj: typeof commentsSchema) {
  return await db.insert(commentsSchema).values(commentObj);
}

// Retrieve

// Update

//TODO: add annotation function
export async function addAnnotation();

// Delete
//
// TODO: write API deletion functions
export async function deleteComment(commentObj: typeof commentsSchema) {
  return await db.delete(commentsSchema).values(commentObj);
}
