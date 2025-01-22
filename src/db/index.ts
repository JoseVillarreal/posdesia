import { drizzle } from "drizzle-orm/node-postgres";
// Import Schemas
import { users as usersSchema, poems as poemsSchema, annotations as annotationsSchema, comments as commentsSchema } from "./schema.ts";

import pg from "pg";

// instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
    client: new Pool({
        connectionString: Deno.env.get("DATABASE_URL"),
    }),
    schema: { usersSchema, poemsSchema, annotationsSchema, commentsSchema },
});

// Create

export async function insertUser(userObj: typeof usersSchema){
    return await db.insert(usersSchema).values(userObj);
}

export async function insertPoem(poemObj: typeof poemsSchema){
    return await db.insert(poemsSchema).values(poemObj);
}

export async function insertAnnotation(annotationObj: typeof annotationSchema){
    return await db.insert(annotationSchema).values(annotationObj);
}

export async function insertComment(commentObj: typeof commentSchema){
    return await db.insert(commentSchema).values(commentObj);
}

// Retrieve

// Update

//TODO: add annotation function
export async function addAnnotation()

// Delete
